var input = require("fs").readFileSync(_dirname + "/dev/stdin/input.txt", "utf8");
var lines = input.split("\r").join("").split("\n");

let digrafos =() =>{
  let di;
  let totalDigrafos;
  let limpar = () => {
    di ={};
    totalDigrafos = 0;
  };
  let add = (x) => {
     totalDigrafos++;
     if(di.hasOwnProperty(x)){
         di[x]++;
     } else {
       di[x] = 1; 
     }
  };
  let getTop = () => {
    let digrafosArray  = [];
    for(let key in di) {
        digrafosArray.push([key, di[key], (di[key]/totalDigrafos).toFixed(6)]);
    }
    digrafosArray.sort((a,b) => {
        if(a[1] < b[1]) return 1;
        if(a[1] > b[1]) return -1;
        if(a[0] > b[0]) return 1;
        if(a[0] < b[0]) return -1;
        return 0;
    });
    return digrafosArray;
  };
  return {limpar, add, getTop};
};

let meuDigrafo = digrafos();
let n = parseInt(lines.shift());
while(n){
    meuDigrafo.limpar();
    let texto = lines.splice(0,n).join("");
    let i = texto.length - 1;
    while(i--){
        meuDigrafo.add(texto.slice(i, i+2));
    }
    console.log(
      meuDigrafo
      .getTop()
      .splice(0, 5)
      .map((s) => s.join(" "))
      .join("\n") + "\n"
    );
    n = parseInt(lines.shift());
}
