// 自己

// 注册 /user/register
// 获取信息 /auth/info
// 更新头像 /auth/updateAvatar
// 更新签名 /auth/updateSign
// 更新性别 /auth/updateGender
// 注销账号 /auth/dissband



// 会话

// 发送消息 /messages/send
// 批量删除消息 (仅自己) /messages/removeByIds
// 基于会话删除自己的所有消息 /messages/removeMyByChatIds
// 基于会话清空消息 (管理员与创建者) /messages/removeByChatIds
// 获取会话列表 /chat/list
// 隐藏会话 /chat/hideByIds // 隐藏后不推送
// 删除我所有的信息 /chat/removeAll


// 群
// 创建群 /group/create
// 邀请用户 /group/inviteJoin
// 申请加入 /group/applyJoin
// 同意邀请 /group/aggInvite
// 同意加入 /group/aggApply
// 删除成员 /group/removeMemberByUids
// 退出群聊 /group/quitByIds
// 退出所有群聊  /group/quitAll // 不退出自己的
// 解散所有群 /group/disss // 解散所有自己创建的群
// 更新公告 /group/updateNotice 
// 更新简介 /group/updateDesc
// 更新头像 /group/updateAvatar
// 解散群聊 /group/removeByIds // 解散将删除所有云端的消息
// 更新分类 /group/updateCategory
// 添加管理员 /group/addAdminByUids
// 移除管理员 /group/removeAdminByUids
// 群详情 /group/info
// 群公告详情 /group/notice
// 申请列表 /group/applyList 
// 加入列表 /group/inviteList 


// 群应用
// 群应用列表 /group/appList
// 添加群应用 /group/addApp
// 删除群应用 /group/removeApp
// 更新群应用 /group/updateApp

// 基础模型
interface Base {
    id: string;
    created_at: string;
    updated_at: string;
}


interface Group extends Base {
    id: string;
    alias: string;
    name: string;
    avatar: string;
    member_count: number;
    member_limit: number;
    status: number;
}
// 用户
// 加入黑名单 (不能发送消息 不能添加好友) /user/
interface Member {
    id: string;
    avatar: string;
    gender: string;
    name: string;
    pub_key: string;
}


// 好友
// 好友列表 /friend/list
// 删除好友 /friend/removeByUids
// 申请好友 /friend/apply
// 同意好友 /friend/accept
// 拒绝好友 /friend/deny
// 更新好友备注 /friend/updateRemark
// 申请列表 /friend/applyList
interface Friend extends Member {
    uid: string;
    is_friend: string;
    alias: string;
}


// 系统
// 获取系统信息 /sys/info
// 获取上传预签名url /sys/r2PresignUrl
// 获取分片上传id /sys/r2UploadId
// 获取分片上传完成url /sys/r2CompleteUrl


// 临时数据通道 超过24小时自动删除
// 创建临时数据通道 /temp/create // 需验证
// 删除临时数据通道 /temp/remove // 需验证
// 获取临时数据通道 /temp/info
// 推送临时数据通道 /temp/push // 需验证



interface SysInfo {
    pub_key: string;
    static_url: string;
}

// 财务

// 钱包列表 /wallets/list
// 钱包信息 /wallets/infoByIds
// 账单列表 /wallets/billListByIds
// 发起支付 /wallets/pay

// 推送消息
// 新消息
// 新加入的群
// 新添加的好友申请
// 新的加群申请
// 新的系统通知
// 群 群消息清空 群解散



// 外置链接
// 个人链接
// 群链接

// 官网


// 用户表
interface User {
    
}
// 好友表
interface Friend {

}
// 好友申请表
interface FriendApply {
    id: string;
    uid: string;
    friend_uid: string;
    remark: string;
    status: string;
    created_at: string;
    updated_at: string;
}
// 黑名单表
interface BlackList {
    uid: string;
    black_uid: string;
}

// 群表
interface Group {
    id: string;
    alias: string;
    name: string;
    avatar: string;
    member_count: number;
    member_limit: number;
    status: number;
}
// 群成员表 
interface GroupMember {
    id: string;
    group_id: string;
    uid: string;
    alias: string;
    role: string;
    status: string;
    created_at: string;
    updated_at: string;
}
// 群申请表
interface GroupApply {
    id: string;
    group_id: string;
    uid: string;
    remark: string;
    status: string;
    created_at: string;
    updated_at: string;
}
// 群邀请表
interface GroupInvite {
    id: string;
    group_id: string;
    uid: string;
    remark: string;
    status: string;
    created_at: string;
    updated_at: string;
}
// 群分类表
interface GroupCategory {
    id: string;
    name: string;
    created_at: string;
    updated_at: string;
}
// 群分类关系表
interface GroupCategoryRelation {
    id: string;
    group_id: string;
    category_id: string;
    created_at: string;
    updated_at: string;
}
// 群应用表
interface GroupApp {
    id: string;
    group_id: string;
    name: string;
    icon: string;
    url: string;
    created_at: string;
    updated_at: string;
}
// 消息表
interface Message {
    id: string;
    uid: string;
    chat_id: string;
    type: string;
    content: string;
    status: string;
    created_at: string;
    updated_at: string;
}

// 会话表
interface Chat {
    id: string;
    type: string;
    name: string;
    avatar: string;
    member_count: number;
    member_limit: number;
    status: number;
    created_at: string;
    updated_at: string;
}