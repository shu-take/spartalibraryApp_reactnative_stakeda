type RootStackParamList = {
  Spartalibrary: undefined;
  BookShow: { bookinfo: BooksInfo };
  BookAdd: undefined;
  BookAddConfirm: { isbninfo: IsbnInfo };
  CodeShow: { codeinfo: CodesInfo };
  AccountShow: { accountinfo: AccountsInfo };
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

interface AccountsInfo {
  user_id: string;
  user_name: string;
  user_email: string;
}

interface IsbnInfo {
  isbn: string;
}

interface BookAddInfo {
  book_id: string;
  contents: string;
  title: string;
  isbn: string;
  img_url: string;
  img_path: string;
  error: string;
}

declare module "react-native-syntax-highlighter";
declare module "react-syntax-highlighter/dist/esm/styles/hljs";
// declare module "react-syntax-highlighter/dist/esm/styles/prism";
