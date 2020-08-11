"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
let fs = require('fs');
let filesList = [];
/**
* 这种格式的时间转为正常的日期
* Thu May 12 2016 08:00:00 GMT+0800 (中国标准时间)
*/
function convertTime(target) {
    var d = new Date(target);
    return d.getFullYear() + '-'
        + (d.getMonth() + 1) + '-'
        + d.getDate() + ' '
        + d.getHours() + ':'
        + d.getMinutes() + ':'
        + d.getSeconds();
}
function readImageList(path, isSub = false) {
    return __awaiter(this, void 0, void 0, function* () {
        isSub || (filesList = []);
        let files = fs.readdirSync(path);
        yield Promise.all(files.map((itm) => __awaiter(this, void 0, void 0, function* () {
            let res = path + itm;
            let stat = fs.statSync(res);
            if (stat.isDirectory()) {
                // 递归读取文件
                readImageList(res + "/", true);
            }
            else {
                if (itm.endsWith('.png')) {
                    // 定义一个对象存放图片的路径和名字
                    let obj = {};
                    // 路径
                    obj.path = path;
                    // 名字
                    obj.filename = itm;
                    obj.size = parseInt(`${stat.size / 1000}`) + 'KB';
                    obj.birthtime = convertTime(stat.birthtime);
                    const url = yield Editor.Ipc.requestToPackage('asset-db', 'query-url-by-path', res);
                    // await Editor.Ipc.requestToPackage('asset-db', 'refresh-asset', url);
                    obj.uuid = yield Editor.Ipc.requestToPackage('asset-db', 'query-asset-uuid', url);
                    obj.mtime = convertTime(stat.mtime);
                    filesList.push(obj);
                }
            }
        })));
        return filesList;
    });
}
exports.default = readImageList;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1hZ2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zb3VyY2UvcGFuZWwvb3BlcmF0aW9uL2ltYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsSUFBSSxFQUFFLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBRXZCLElBQUksU0FBUyxHQUFVLEVBQUUsQ0FBQztBQUUxQjs7O0VBR0U7QUFDRixTQUFTLFdBQVcsQ0FBQyxNQUFjO0lBQy9CLElBQUksQ0FBQyxHQUFHLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3pCLE9BQU8sQ0FBQyxDQUFDLFdBQVcsRUFBRSxHQUFHLEdBQUc7VUFDMUIsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRztVQUN4QixDQUFDLENBQUMsT0FBTyxFQUFFLEdBQUcsR0FBRztVQUNqQixDQUFDLENBQUMsUUFBUSxFQUFFLEdBQUcsR0FBRztVQUNsQixDQUFDLENBQUMsVUFBVSxFQUFFLEdBQUcsR0FBRztVQUNwQixDQUFDLENBQUMsVUFBVSxFQUFFLENBQUM7QUFDckIsQ0FBQztBQUVELFNBQThCLGFBQWEsQ0FBQyxJQUFZLEVBQUUsUUFBaUIsS0FBSzs7UUFDNUUsS0FBSyxJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQyxDQUFDO1FBQzFCLElBQUksS0FBSyxHQUFHLEVBQUUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDakMsTUFBTSxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBTyxHQUFRLEVBQUUsRUFBRTtZQUMzQyxJQUFJLEdBQUcsR0FBRyxJQUFJLEdBQUcsR0FBRyxDQUFDO1lBQ3JCLElBQUksSUFBSSxHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDNUIsSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFLEVBQUU7Z0JBQ3BCLFNBQVM7Z0JBQ1QsYUFBYSxDQUFDLEdBQUcsR0FBRyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7YUFDbEM7aUJBQU07Z0JBQ0gsSUFBSSxHQUFHLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFO29CQUN0QixtQkFBbUI7b0JBQ25CLElBQUksR0FBRyxHQUFRLEVBQUUsQ0FBQztvQkFDbEIsS0FBSztvQkFDTCxHQUFHLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDaEIsS0FBSztvQkFDTCxHQUFHLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQztvQkFDbkIsR0FBRyxDQUFDLElBQUksR0FBRyxRQUFRLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDO29CQUNsRCxHQUFHLENBQUMsU0FBUyxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7b0JBQzVDLE1BQU0sR0FBRyxHQUFHLE1BQU0sTUFBTSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLEVBQUUsbUJBQW1CLEVBQUUsR0FBRyxDQUFDLENBQUM7b0JBQ3BGLHVFQUF1RTtvQkFDdkUsR0FBRyxDQUFDLElBQUksR0FBRyxNQUFNLE1BQU0sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxFQUFFLGtCQUFrQixFQUFFLEdBQUcsQ0FBQyxDQUFDO29CQUNsRixHQUFHLENBQUMsS0FBSyxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQ3BDLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7aUJBQ3ZCO2FBQ0o7UUFDTCxDQUFDLENBQUEsQ0FBQyxDQUFDLENBQUM7UUFDSixPQUFPLFNBQVMsQ0FBQztJQUNyQixDQUFDO0NBQUE7QUE1QkQsZ0NBNEJDIiwic291cmNlc0NvbnRlbnQiOlsibGV0IGZzID0gcmVxdWlyZSgnZnMnKTtcclxuXHJcbmxldCBmaWxlc0xpc3Q6IGFueVtdID0gW107XHJcblxyXG4vKipcclxuKiDov5nnp43moLzlvI/nmoTml7bpl7TovazkuLrmraPluLjnmoTml6XmnJ9cclxuKiBUaHUgTWF5IDEyIDIwMTYgMDg6MDA6MDAgR01UKzA4MDAgKOS4reWbveagh+WHhuaXtumXtClcclxuKi9cclxuZnVuY3Rpb24gY29udmVydFRpbWUodGFyZ2V0OiBzdHJpbmcpIHtcclxuICAgIHZhciBkID0gbmV3IERhdGUodGFyZ2V0KTtcclxuICAgIHJldHVybiBkLmdldEZ1bGxZZWFyKCkgKyAnLSdcclxuICAgICsgKGQuZ2V0TW9udGgoKSArIDEpICsgJy0nXHJcbiAgICArIGQuZ2V0RGF0ZSgpICsgJyAnXHJcbiAgICArIGQuZ2V0SG91cnMoKSArICc6J1xyXG4gICAgKyBkLmdldE1pbnV0ZXMoKSArICc6J1xyXG4gICAgKyBkLmdldFNlY29uZHMoKTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgZnVuY3Rpb24gcmVhZEltYWdlTGlzdChwYXRoOiBzdHJpbmcsIGlzU3ViOiBib29sZWFuID0gZmFsc2UpIHtcclxuICAgIGlzU3ViIHx8IChmaWxlc0xpc3QgPSBbXSk7XHJcbiAgICBsZXQgZmlsZXMgPSBmcy5yZWFkZGlyU3luYyhwYXRoKTtcclxuICAgIGF3YWl0IFByb21pc2UuYWxsKGZpbGVzLm1hcChhc3luYyAoaXRtOiBhbnkpID0+IHtcclxuICAgICAgICBsZXQgcmVzID0gcGF0aCArIGl0bTtcclxuICAgICAgICBsZXQgc3RhdCA9IGZzLnN0YXRTeW5jKHJlcyk7XHJcbiAgICAgICAgaWYgKHN0YXQuaXNEaXJlY3RvcnkoKSkge1xyXG4gICAgICAgICAgICAvLyDpgJLlvZLor7vlj5bmlofku7ZcclxuICAgICAgICAgICAgcmVhZEltYWdlTGlzdChyZXMgKyBcIi9cIiwgdHJ1ZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKGl0bS5lbmRzV2l0aCgnLnBuZycpKSB7XHJcbiAgICAgICAgICAgICAgICAvLyDlrprkuYnkuIDkuKrlr7nosaHlrZjmlL7lm77niYfnmoTot6/lvoTlkozlkI3lrZdcclxuICAgICAgICAgICAgICAgIGxldCBvYmo6IGFueSA9IHt9O1xyXG4gICAgICAgICAgICAgICAgLy8g6Lev5b6EXHJcbiAgICAgICAgICAgICAgICBvYmoucGF0aCA9IHBhdGg7XHJcbiAgICAgICAgICAgICAgICAvLyDlkI3lrZdcclxuICAgICAgICAgICAgICAgIG9iai5maWxlbmFtZSA9IGl0bTtcclxuICAgICAgICAgICAgICAgIG9iai5zaXplID0gcGFyc2VJbnQoYCR7c3RhdC5zaXplIC8gMTAwMH1gKSArICdLQic7XHJcbiAgICAgICAgICAgICAgICBvYmouYmlydGh0aW1lID0gY29udmVydFRpbWUoc3RhdC5iaXJ0aHRpbWUpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdXJsID0gYXdhaXQgRWRpdG9yLklwYy5yZXF1ZXN0VG9QYWNrYWdlKCdhc3NldC1kYicsICdxdWVyeS11cmwtYnktcGF0aCcsIHJlcyk7XHJcbiAgICAgICAgICAgICAgICAvLyBhd2FpdCBFZGl0b3IuSXBjLnJlcXVlc3RUb1BhY2thZ2UoJ2Fzc2V0LWRiJywgJ3JlZnJlc2gtYXNzZXQnLCB1cmwpO1xyXG4gICAgICAgICAgICAgICAgb2JqLnV1aWQgPSBhd2FpdCBFZGl0b3IuSXBjLnJlcXVlc3RUb1BhY2thZ2UoJ2Fzc2V0LWRiJywgJ3F1ZXJ5LWFzc2V0LXV1aWQnLCB1cmwpO1xyXG4gICAgICAgICAgICAgICAgb2JqLm10aW1lID0gY29udmVydFRpbWUoc3RhdC5tdGltZSk7XHJcbiAgICAgICAgICAgICAgICBmaWxlc0xpc3QucHVzaChvYmopO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSkpO1xyXG4gICAgcmV0dXJuIGZpbGVzTGlzdDtcclxufVxyXG4iXX0=