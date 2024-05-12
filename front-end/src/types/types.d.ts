export interface CondensedChannelData {
    name: string,
    profile_pic: string,
    tag: string,
    sub_count: number,
    active_channel: boolean,
}

export interface ChannelData {
    name: string,
    profile_pic: string | null,
    banner: string | null,
    subscriptions: CondensedChannelData[],
    sub_count: number,
    tag: string,
    active_channel: boolean,
}

export interface BaseResponse {
    status: number,
}

// Status code will be used to determine if data field exists
export interface ChannelDataResponse extends BaseResponse {
    data: ChannelData,
}

// Used typically when getting multiple channels, only usually need condensed info
export interface ManyCondensedChannelDataResponse extends BaseResponse {
    data: CondensedChannelData[]
}

interface UserInfo {
    email: string,
}

export interface UserInfoResponse extends BaseResponse {
    data: UserInfo
}

export interface ComponentWithProps  {
    inChannelHome?: boolean,
    hasBorder?: boolean,
    isCreateBtn?: boolean,
    sideExpand?: boolean,
    modalSideExpand?: boolean,
    noMiniSideBar?: boolean,
    miniSearchState?: boolean,
    focus?: boolean,
    isSubbed?: boolean,
    isFiltered?: boolean,
    hasDivider?: boolean,
    inFullScreen?: boolean,
    expandDesc?: boolean,
    isReply?: boolean,
    expandText?: boolean,
}
