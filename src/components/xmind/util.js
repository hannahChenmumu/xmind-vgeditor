// Returns contents of a canvas as a png based data url, with the specified
// background color
export const getRectPath = (x, y, w, h, r) => {
  if (r) {
    return [
      ['M', +x + +r, y],
      ['l', w - r * 2, 0],
      ['a', r, r, 0, 0, 1, r, r],
      ['l', 0, h - r * 2],
      ['a', r, r, 0, 0, 1, -r, r],
      ['l', r * 2 - w, 0],
      ['a', r, r, 0, 0, 1, -r, -r],
      ['l', 0, r * 2 - h],
      ['a', r, r, 0, 0, 1, r, -r],
      ['z'],
    ];
  }
  const res = [['M', x, y], ['l', w, 0], ['l', 0, h], ['l', -w, 0], ['z']];
  res.toString = toString;
  return res;
};

// 获取canvas的base64图片的dataURL（图片格式为image/jpeg）
export const exportCanvasToImage = (canvas, pattern = 'image/png', filename = '', backgroundColor) => {
  const w = canvas.width;
  const h = canvas.height;
  let data;
  const context = canvas.getContext('2d');
  let compositeOperation;
  if (backgroundColor) {
    data = context.getImageData(0, 0, w, h);
    compositeOperation = context.globalCompositeOperation;
    context.globalCompositeOperation = 'destination-over';
    context.fillStyle = backgroundColor;
    context.fillRect(0, 0, w, h);
  }
  const imageData = canvas.toDataURL(pattern);
  if (backgroundColor) {
    context.clearRect(0, 0, w, h);
    context.putImageData(data, 0, 0);
    context.globalCompositeOperation = compositeOperation;
  }

  const oA = document.createElement('a');
  oA.download = filename; // 设置下载的文件名，默认是'下载'
  oA.href = imageData;
  document.body.appendChild(oA);
  oA.click();
  oA.remove();
};
