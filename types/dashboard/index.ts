/*Recent Transaction*/
type recentTrans = {
  title: string;
  subtitle: string;
  textcolor: string;
  boldtext: boolean;
  line: boolean;
  link: string;
  url: string;
};

/*product performance*/
type productPerformanceType = {
  id: number;
  name: string;
  post: string;
  pname: string;
  status: string;
  statuscolor: string;
  budget: string;
};

/*Products card types*/
type productsCards = {
  title: string;
  link: string;
  photo: string;
  salesPrice: number;
  price: number;
  rating: number;
};

type baseUrls = {
  url_base: string;
  url_public: string;
  url_admin: string;
};

export type { baseUrls, recentTrans, productPerformanceType, productsCards };
