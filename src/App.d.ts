type RootStackParamList = {
  Spartalibrary: undefined;
  BookShow: { bookinfo: BooksInfo };
  CodeShow: { codeinfo: CodesInfo };
};


interface BooksInfo {
  book_id: string;
  book_title: string;
  book_contents: string;
  book_isbn: string;
  book_img_path: string;
}

interface CodesInfo {
  code_id: string;
  code_title: string;
  code_contents: string;
  code: string;
  code_book: string;
}