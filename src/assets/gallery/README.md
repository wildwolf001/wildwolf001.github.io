把你的图片放到这个目录（按文件夹分类）：`src/assets/gallery/<分类名>/`

图库页（`src/views/GalleryPage.vue`）会通过 Vite 的 `import.meta.glob` 自动读取本目录下的图片并展示。

## 支持格式

- png / jpg / jpeg / webp / gif / svg

## 文件名约定（可选）

你可以用文件名写标题和标签：

- `标题__标签.jpg`

例如：

- `海边散步__旅行.jpg`
- `极简桌面__设计.png`

不写标签也可以，默认标签为“文件夹分类名”。

## 推荐目录结构

例如：

- `src/assets/gallery/旅行/海边散步.jpg`
- `src/assets/gallery/设计/极简桌面.png`
- `src/assets/gallery/生活/咖啡与阳光.jpg`

