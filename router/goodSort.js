const express = require('express')
const router = express()


// 路由操作模块
const { addGoodSort,deleteSortById,updateSort,getAllSort,getSortAllGood} = require('../dealRouter/dealGoodSort')



// 新建一个分类
router.post('/addGoodSort', addGoodSort)
// 删除分类
router.delete('/deleteSortById/:id', deleteSortById)
// 修改一个分类
router.put('/updateSort/:id', updateSort)
// 查询全部分类
router.get('/getAllSort', getAllSort)
// 查询类别下面的全部商品
router.get('/getSortAllGood/:id', getSortAllGood)





module.exports = router