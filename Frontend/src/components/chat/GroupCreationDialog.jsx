'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Search, 
  Users, 
  Hash, 
  X,
  UserPlus,
  Crown,
  Shield,
  User
} from 'lucide-react'
import { usersAPI, groupsAPI } from '@/lib/api'
import { toast } from '@/hooks/use-toast'

export default function GroupCreationDialog({ 
  open, 
  onOpenChange, 
  onGroupCreated 
}) {
  const [activeTab, setActiveTab] = useState('basic')
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [isSearching, setIsSearching] = useState(false)
  const [selectedMembers, setSelectedMembers] = useState([])
  const [groupData, setGroupData] = useState({
    name: '',
    description: '',
    type: 'group',
    isPrivate: false,
    members: []
  })

  useEffect(() => {
    if (searchQuery) {
      searchUsers()
    } else {
      setSearchResults([])
    }
  }, [searchQuery])

  const searchUsers = async () => {
    if (!searchQuery.trim()) return
    
    setIsSearching(true)
    try {
      const response = await usersAPI.search({ query: searchQuery })
      setSearchResults(response.data.users || [])
    } catch (error) {
      console.error('Search error:', error)
    } finally {
      setIsSearching(false)
    }
  }

  const addMember = (user) => {
    if (!selectedMembers.find(member => member._id === user._id)) {
      setSelectedMembers(prev => [...prev, user])
      setGroupData(prev => ({
        ...prev,
        members: [...prev.members, user._id]
      }))
    }
  }

  const removeMember = (userId) => {
    setSelectedMembers(prev => prev.filter(member => member._id !== userId))
    setGroupData(prev => ({
      ...prev,
      members: prev.members.filter(id => id !== userId)
    }))
  }

  const handleCreateGroup = async () => {
    try {
      if (!groupData.name.trim()) {
        toast({
          title: "خطا",
          description: "نام گروه الزامی است",
          variant: "destructive",
        })
        return
      }

      const response = await groupsAPI.create(groupData)
      
      toast({
        title: "گروه ایجاد شد",
        description: "گروه با موفقیت ایجاد شد",
      })
      
      onGroupCreated(response.data.group)
      handleClose()
    } catch (error) {
      toast({
        title: "خطا",
        description: "خطا در ایجاد گروه",
        variant: "destructive",
      })
    }
  }

  const handleClose = () => {
    setGroupData({
      name: '',
      description: '',
      type: 'group',
      isPrivate: false,
      members: []
    })
    setSelectedMembers([])
    setSearchQuery('')
    setSearchResults([])
    setActiveTab('basic')
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="text-right">ایجاد گروه جدید</DialogTitle>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="basic">اطلاعات پایه</TabsTrigger>
            <TabsTrigger value="members">اعضا</TabsTrigger>
          </TabsList>
          
          <TabsContent value="basic" className="space-y-4">
            <div>
              <Label htmlFor="groupName">نام گروه</Label>
              <Input
                id="groupName"
                value={groupData.name}
                onChange={(e) => setGroupData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="نام گروه را وارد کنید"
              />
            </div>
            
            <div>
              <Label htmlFor="groupDesc">توضیحات</Label>
              <Textarea
                id="groupDesc"
                value={groupData.description}
                onChange={(e) => setGroupData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="توضیحات گروه (اختیاری)"
                rows={3}
              />
            </div>

            <div className="flex items-center space-x-2 space-x-reverse">
              <Label htmlFor="groupType">نوع گروه</Label>
              <select
                id="groupType"
                value={groupData.type}
                onChange={(e) => setGroupData(prev => ({ ...prev, type: e.target.value }))}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
              >
                <option value="group">گروه</option>
                <option value="channel">کانال</option>
              </select>
            </div>

            <div className="flex items-center space-x-2 space-x-reverse">
              <input
                type="checkbox"
                id="isPrivate"
                checked={groupData.isPrivate}
                onChange={(e) => setGroupData(prev => ({ ...prev, isPrivate: e.target.checked }))}
                className="rounded"
              />
              <Label htmlFor="isPrivate">گروه خصوصی</Label>
            </div>
          </TabsContent>
          
          <TabsContent value="members" className="space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="جست‌وجو کاربران..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-10"
              />
            </div>

            {/* Selected Members */}
            {selectedMembers.length > 0 && (
              <div>
                <Label className="text-sm font-medium mb-2 block">اعضای انتخاب شده</Label>
                <div className="flex flex-wrap gap-2">
                  {selectedMembers.map((member) => (
                    <Badge key={member._id} variant="secondary" className="flex items-center gap-1">
                      <Avatar className="w-4 h-4">
                        <AvatarImage src={member.profilePicture} />
                        <AvatarFallback className="text-xs">{member.fullName?.charAt(0)}</AvatarFallback>
                      </Avatar>
                      {member.fullName}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-4 w-4 p-0"
                        onClick={() => removeMember(member._id)}
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Search Results */}
            {searchResults.length > 0 && (
              <div>
                <Label className="text-sm font-medium mb-2 block">نتایج جست‌وجو</Label>
                <ScrollArea className="h-48">
                  <div className="space-y-2">
                    {searchResults.map((user) => (
                      <div
                        key={user._id}
                        onClick={() => addMember(user)}
                        className="flex items-center p-3 hover:bg-accent cursor-pointer rounded-lg"
                      >
                        <Avatar className="w-8 h-8 ml-3">
                          <AvatarImage src={user.profilePicture} />
                          <AvatarFallback>{user.fullName?.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{user.fullName}</p>
                          <p className="text-xs text-muted-foreground">@{user.username}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          disabled={selectedMembers.find(member => member._id === user._id)}
                        >
                          <UserPlus className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Actions */}
        <div className="flex space-x-2 space-x-reverse pt-4 border-t">
          <Button variant="outline" onClick={handleClose} className="flex-1">
            لغو
          </Button>
          <Button 
            onClick={handleCreateGroup} 
            className="flex-1"
            disabled={!groupData.name.trim()}
          >
            ایجاد گروه
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
