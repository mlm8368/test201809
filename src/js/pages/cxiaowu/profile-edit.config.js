import district from '../../../json/district.json'

export const PickerData = {
  type: [
    [
      { label: '公立学校', value: '公立学校' },
      { label: '私立学校', value: '私立学校' },
      { label: '培训机构', value: '培训机构' },
      { label: '其他', value: '其他' }
    ]
  ],
  catid: [
    [
      { label: '幼教启蒙班', value: 3 },
      { label: '幼教小班', value: 7 },
      { label: '幼教中班', value: 8 },
      { label: '幼教大班', value: 9 },
      { label: '英语培训班', value: 10 },
      { label: '舞蹈培训班', value: 11 },
      { label: '武术培训班', value: 12 },
      { label: '画画培训班', value: 13 }
    ]
  ],
  size: [
    [
      { label: '1-9人', value: '1-9人' },
      { label: '10-29人', value: '10-29人' },
      { label: '30-49人', value: '30-49人' },
      { label: '50-99人', value: '50-99人' },
      { label: '100-300人', value: '100-300人' },
      { label: '300-500人', value: '300-500人' },
      { label: '500-1000人', value: '500-1000人' },
      { label: '1000人以上', value: '1000人以上' }
    ]
  ],
  regunit: [
    [
      { label: '人民币', value: '人民币' },
      { label: '港元', value: '港元' },
      { label: '美元', value: '美元' },
      { label: '欧元', value: '欧元' },
      { label: '英镑', value: '英镑' }
    ]
  ],
  gender: [
    [
      { label: '男', value: 1 },
      { label: '女', value: 2 }
    ]
  ],
  areaid: district
}

export const CheckboxData = {
  mode: [
    { value: '1', title: '全日制教学' },
    { value: '2', title: '培训班' },
    { value: '3', title: '一对一教学' }
  ]
}
