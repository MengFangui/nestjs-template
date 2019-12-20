import { Controller, Post, Body } from '@nestjs/common';
// let fs = require("fs");
// let path = require("path");
import * as fs from 'fs'
import { join } from 'path'
// function deleteFolderRecursive(url) {
//     var files = [];
//     //判断给定的路径是否存在
//     if (fs.existsSync(url)) {
//         //返回文件和子目录的数组
//         files = fs.readdirSync(url);
//         files.forEach(function (file, index) {
//             // var curPath = url + "/" + file;
//             var curPath = path.join(url, file);
//             //fs.statSync同步读取文件夹文件，如果是文件夹，在重复触发函数
//             if (fs.statSync(curPath).isDirectory()) { // recurse
//                 deleteFolderRecursive(curPath);
//                 // 是文件delete file
//             } else {
//                 fs.unlinkSync(curPath);
//             }
//         });
//         //清除文件夹
//         fs.rmdirSync(url);
//     } else {
//         console.log("给定的路径不存在，请给出正确的路径");
//     }
// };
@Controller('delete-file')
export class DeletefileController {

    @Post('delete')
    deleteFile(@Body() Body) {
        try {
            fs.unlinkSync(join(__dirname, '../../../../public/upload', Body.filename));
            return {
                status: 1,
                msg: '文件删除成功'
            }
        } catch (error) {
            return {
                status: 0,
                msg: '给定的文件不存在，请给出正确的文件路径'
            }
        }
    }
}
