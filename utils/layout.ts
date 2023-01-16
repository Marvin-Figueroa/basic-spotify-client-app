export const size = {
  flexGrow: 0,
  // this is real 0-650px range
  '@xsMax': {
    maxWidth: '100%',
    flexBasis: '65%',
  },
  // this is >=650px range
  // in docs it is 0-650px range
  '@xs': {
    // defining maxWidth here neglects all higher levels
    // why does it work differently?
    // maxWidth: '150%',
    flexBasis: '40%',
  },
  // this is >= 960px
  // in docs it is >= 650px
  '@smMin': {
    //or mdMax do not work!
    maxWidth: '30%',
    flexBasis: '30%',
  },
  // this is >=1280px
  // in docs it is >=960px
  '@mdMin': {
    //or mdMax do not work!
    maxWidth: '20%',
    flexBasis: '20%',
  },
  // '@lgMin': {
  //   //or mdMax do not work!
  //   maxWidth: '10%',
  //   flexBasis: '10%',
  // },
};
