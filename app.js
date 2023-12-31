const { createApp, ref, computed } = Vue

  createApp({
    setup() {
     const products = ref([
         {
            "id": 1,
            "name":"Intelligent Granite Table",
            "category":"Tools",
            "price":"787.00"
         },
         {
            "id": 2,
            "name":"Handcrafted Rubber Hat",
            "category":"Games",
            "price":"232.00"
         },
         {
            "id": 3,
            "name":"Rustic Concrete Salad",
            "category":"Jewelery",
            "price":"115.00"
         },
         {
            "id": 4,
            "name":"Gorgeous Concrete Pizza",
            "category":"Garden",
            "price":"250.00"
         },
         {
            "id": 5,
            "name":"Refined Plastic Shoes",
            "category":"Health",
            "price":"844.00"
         },
         {
            "id": 6,
            "name":"Awesome Metal Soap",
            "category":"Tools",
            "price":"326.00"
         },
         {
            "id": 7,
            "name":"Intelligent Fresh Mouse",
            "category":"Home",
            "price":"783.00"
         },
         {
            "id": 8,
            "name":"Licensed Soft Keyboard",
            "category":"Music",
            "price":"361.00"
         },
         {
            "id": 9,
            "name":"Fantastic Rubber Pants",
            "category":"Garden",
            "price":"786.00"
         },
         {
            "id": 10,
            "name":"Awesome Rubber Ball",
            "category":"Automotive",
            "price":"696.00"
         },
         {
            "id": 11,
            "name":"Handcrafted Soft Pizza",
            "category":"Health",
            "price":"31.00"
         },
         {
            "id": 12,
            "name":"Practical Soft Chips",
            "category":"Computers",
            "price":"795.00"
         },
         {
            "id": 13,
            "name":"Practical Frozen Shirt",
            "category":"Kids",
            "price":"879.00"
         },
         {
            "id": 14,
            "name":"Unbranded Plastic Car",
            "category":"Toys",
            "price":"454.00"
         },
         {
            "id": 15,
            "name":"Handcrafted Plastic Table",
            "category":"Shoes",
            "price":"189.00"
         },
         {
            "id": 16,
            "name":"Intelligent Plastic Car",
            "category":"Grocery",
            "price":"202.00"
         },
         {
            "id": 17,
            "name":"Ergonomic Wooden Pizza",
            "category":"Electronics",
            "price":"801.00"
         },
         {
            "id": 18,
            "name":"Refined Rubber Pants",
            "category":"Home",
            "price":"580.00"
         },
         {
            "id": 19,
            "name":"Small Frozen Hat",
            "category":"Music",
            "price":"654.00"
         },
         {
            "id": 20,
            "name":"Unbranded Cotton Chips",
            "category":"Tools",
            "price":"305.00"
         },
         {
            "id": 21,
            "name":"Unbranded Plastic Chicken",
            "category":"Baby",
            "price":"943.00"
         },
         {
            "id": 22,
            "name":"Rustic Fresh Pizza",
            "category":"Toys",
            "price":"647.00"
         },
         {
            "id": 23,
            "name":"Ergonomic Metal Tuna",
            "category":"Industrial",
            "price":"51.00"
         },
         {
            "id": 24,
            "name":"Unbranded Frozen Chicken",
            "category":"Movies",
            "price":"248.00"
         },
         {
            "id": 25,
            "name":"Ergonomic Cotton Table",
            "category":"Baby",
            "price":"4.00"
         },
         {
            "id": 26,
            "name":"Handmade Frozen Pants",
            "category":"Home",
            "price":"731.00"
         },
         {
            "id": 27,
            "name":"Rustic Cotton Bike",
            "category":"Jewelery",
            "price":"161.00"
         },
         {
            "id": 28,
            "name":"Licensed Metal Bacon",
            "category":"Books",
            "price":"331.00"
         },
         {
            "id": 29,
            "name":"Practical Cotton Soap",
            "category":"Books",
            "price":"861.00"
         },
         {
            "id": 30,
            "name":"Sleek Frozen Tuna",
            "category":"Electronics",
            "price":"375.00"
         }
      ]);
      
      const order = ref({
         dir: 1,
         colum: null,
      });

      const filters = ref({
         name: null,
         keywords: '',
      });

      const isSearching = ref(false);

      const keywordsIsInvalid = computed( () => filters.value.keywords.length < 3 );

      const productsSorted = computed( () => {
         
         return  productsFiltered.value.sort( (a, b) => {
            let left = a[order.value.colum], right = b[order.value.colum];

            if(isNaN(left) && isNaN(right))
            {
               if(left < right) return -1 * order.value.dir;
               else if(left > right ) return 1 * order.value.dir;
               else return 0;
            }else{
               return (left - right) * order.value.dir
            }
         })
        
      });

      const clearSearchText = () => {
         filters.value.name = filters.value.keywords = null;
         isSearching.value = false;
      };

      const productsFiltered = computed( () => {

         let productsFiltring = products.value;

         if(isSearching.value)
         {
            let productFilterReg = new RegExp(filters.value.name, 'i');
            productsFiltring = productsFiltring.filter((product)=> product.name.match(productFilterReg));
            
         }

         return productsFiltring;
      });

      const sort = (colum) => {
         order.value.colum = colum;
         order.value.dir *= -1;         
      };

      const sortDirection = () => {
        return order.value.dir === 1 ? 'ascending': 'descending'
      };
      
      const classes = (col) => {
         
         return [
            'sort-control',
            col === order.value.colum? sortDirection():''
         ]
      };

      const search = () => {

         if(!keywordsIsInvalid.value) {
            filters.value.name = filters.value.keywords;
            isSearching.value = true;
         }
      };

      //pagination
      const perPage = ref(10);
      const currentPage = ref(1);

      const totalPages = Math.ceil(productsFiltered.value.length / perPage.value);

      const isFirstPage = () => currentPage.value === 1;
      const isLastPage = () => currentPage.value === totalPages;

      const productsPaginated = computed( () => {
         let start = (currentPage.value - 1) * perPage.value;
         let end = perPage.value * currentPage.value;

         return productsSorted.value.slice(start, end);
      });

      const prev = () => {
         if(!isFirstPage()) {
            currentPage.value--;
         }
      };

      const next = () => {
         if(!isLastPage()) {
            currentPage.value++;
         }
      };

      const switchPage = (page) => currentPage.value = page;

      return {
        products,
        productsSorted,
        sort,
        classes,
        filters,
        clearSearchText,
        search,
        isSearching,
        keywordsIsInvalid,
        productsPaginated,
        prev,
        next,
        isFirstPage,
        isLastPage,
        currentPage,
        totalPages,
        switchPage
      }
    }
  }).mount('#app')