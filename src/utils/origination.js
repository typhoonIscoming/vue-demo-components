
import Exif from 'exif-js'

const getImageTag = (file, tag = 'Orientation') => {
    if (!file) return 0;
    return new Promise((resolve, reject) => {
        /* eslint-disable func-names */
        // 箭头函数会修改this，所以这里不能用箭头函数
        Exif.getData(file, function () {
            const o = Exif.getTag(this, tag);
            resolve(o);
        });
    });
};

export default getImageTag
