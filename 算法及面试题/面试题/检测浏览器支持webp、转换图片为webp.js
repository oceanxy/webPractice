// 阿里云oss支持通过链接后面拼参数来做图片的格式转换，尝试写一下，把任意图片格式转换为webp，需要注意什么？

// 面试官这么问，一是因为webp存在兼容问题，需要做浏览器兼容检测。二是考察边界检测思维

function checkWebp() {
  try {
    return (
      document.createElement('canvas')
        .toDataURL('image/webp')
        .indexOf('data:image/webp') === 0
    )
  } catch (e) {
    return false
  }
}

const supportWebp = checkWebp()

export function getWebpImageUrl(url) {
  if (!url) {
    throw new Error('url 不能为空！')
  }

  if (url.startsWith('data:')) {
    return url
  }

  if (!supportWebp) {
    return url
  }

  return url + '?x-oss-processxxxxxxx'
}
