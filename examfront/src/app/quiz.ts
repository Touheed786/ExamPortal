export interface Quiz {
    title: string;
    description: string;
    maxMArks: string;
    numberOfQuestions: string;
    active: boolean;
    category: Category;
}

export interface Category {
    cid: string;
    title: string;
  }
