// import Mock from 'mockjs'

// function param2Obj(url) {
//   const search = url.split('?')[1]
//   if (!search) {
//     return {}
//   }
//   return JSON.parse('{"' + decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
// }

// let List = []

// for (let i = 0; i < 20; i++) {
//   List.push(Mock.mock({
//     id: Mock.Random.guid(),
//     number:Mock.Random.integer(0-1),
//     Serial: Mock.Random.guid(),
//     name: Mock.Random.cname(),
//     formats:Mock.Random.integer(0, 1,2),
//     modifier:Mock.Random.cname() ,
//     modifyTime: Mock.Random.date(),
//   }))
// }

// export default {
//   getUserList: config => {
//     const { name, page = 1, limit = 20 } = param2Obj(config.url)

//     const mockList = List.filter(user => {
//       if (name && user.name.indexOf(name) === -1) return false
//       return true
//     })

//     const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

//     return {
//       code: 0,
//       data: {
//         total: mockList.length,
//         users: pageList
//       }
//     }
//   },
//   createUser: config => {
//     const { number, Serial, name, dialogformats, modifier, modifyTime } = param2Obj(config.url)
//     List.push({
//       id: Mock.Random.guid(),
//       modifyTime: modifyTime,
//       modifier: modifier,
//       aSerialddr: Serial,
//       name: name,
//       number: number,
//       formats: dialogformats
//     })
//     console.log(List,"添加成功")
//     return {
//       code: 0,
//       data: {
//         message: '添加成功'
//       }
//     }
//   },
//   deleteUser: config => {
//     const { id } = param2Obj(config.url)
//     List = List.filter(u => u.id !== id)
//      console.log(List,"删除成功")
//     return {
//       code: 0,
//       data: {
//         message: '删除成功'
//       }
//     }
//   },
//   batchremove: config => {
//     let { ids } = param2Obj(config.url)
//     ids = ids.split(',')
//     List = List.filter(u => !ids.includes(u.id))
//     return {
//       code: 0,
//       data: {
//         message: '批量删除成功'
//       }
//     }
//   },
//   updateUser: config => {
//     const { id, name, modifyTime, modifier, number, formats } = param2Obj(config.url)
//     //const sex_num = parseInt(sex)
//     List.some(u => {
//       if (u.id === id) {
//         u.modifyTime= modifyTime,
//         u.modifier= modifier,
//         u.aSerialddr= Serial,
//         u.name= name,
//         u.number= number,
//         u.formats= formats
//         return true
//       }
//     })
//     return {
//       code: 0,
//       data: {
//         message: '编辑成功'
//       }
//     }
//   }
// }
