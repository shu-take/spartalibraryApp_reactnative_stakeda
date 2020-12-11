type RootStackParamList = {
  BookIndex: undefined;
  BookShow: { bookinfo: BooksInfo};
};


interface BooksInfo {
  book_id: string;
  book_title: string;
  book_contents: string;
  book_isbn: string;
  book_img_path: string;
}