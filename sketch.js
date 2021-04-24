
let nbarray = [];
let detailX;
// 初始內容
function setup() {
  createCanvas(600, 600, WEBGL); // 決定 使用 3D 方式進行渲染
   detailX = createSlider(3, 24, 3);
  detailX.position(10, height + 5);
  detailX.style('width', '80px');
  for(let i=0;i<5;i+=1){
    
    nbarray.push(new myBox(50,-height/2.4+(height/5)*i,0,50));
  }
  //nb = new myBox(50,50,0,50);
  //nb2 = new myBox(-50,150,0,25);
  //nb3 = new myBox(-150,100,0,50);
}
function draw() {
  background(38, 3);
  noFill();
  stroke(mouseX+100,mouseY+100,240);
   rotateY(millis() / 1000);
  ellipsoid(600, 800, 800, detailX.value(), 8);
let from = color(218, 165, 32);
let to = color(72, 61, 139);
colorMode(RGB); // Try changing to HSB.
  // 將袋子中 所有 東西 稱為 V 執行他的相關函式
  nbarray.forEach((v)=>{
    /*
    if (mouseIsPressed){
      fill(0,255,0);
    }else{
      fill(255,0,0);
    }
    */
    v.display();
  })
  //nb.display();
  //nb2.display();
  //nb3.display();
}
// 自訂一個類別物件
class myBox{
  // 怎樣建構這個物件 只執行一次
  constructor(x,y,z,size){
    this.x=x;
    this.y=y;
    this.z=z;
    this.size=size;
    this.mx = 1;
    // 隨機產生物件顏色
    this.cc = color(random(255),random(255),random(255));
    // 衛星的中心xyz = 物件，衛星的大小 < 物件， 衛星的距離自訂
    this.stela = new stela(this.x,this.y,this.z,this.size*0.25,this.size);
  }
  // 定義一些能力 我們呼叫時 執行 
  // 能力1:顯現這box
  display(){
    push();
      translate(this.x,this.y,this.z);  
      if (mouseX-width/2 > this.x-this.size/2 && 
          mouseX-width/2 < this.x+this.size/2 &&
          mouseY-height/2 > this.y-this.size/2 && 
          mouseY-height/2 < this.y+this.size/2 ){
        rotateX(frameCount*0.01);
        rotateY(frameCount*0.01);
        this.mx = this.mx+0.5;
        this.cc = color(random(255),0,random(255));
        }
      this.stela.display();
      noFill(this.cc);
      rotateX(frameCount * 0.01);
      rotateY(frameCount * 0.01);
      torus(this.size);          
    pop();
    this.move();
  }
  //能力2:移動規則
  move(){
    if (this.x>width/2){this.mx = -1*this.mx;}
    if (this.x<-width/2){this.mx = -1*this.mx;} 
    if (this.y>width/2){this.mx = -1*this.mx;}
    if (this.y<-width/2){this.mx = -1*this.mx;}
    if (this.z>width/2){this.mx = -1*this.mx;}
    if (this.z<-width/2){this.mx = -1*this.mx;}
    this.x = this.x + this.mx;
    this.y = this.y + this.mx;
    this.z = this.z + this.mx;  
  }
}
// 衛星
class stela{
  constructor(x,y,z,size,cdx){
    //衛星的旋轉中心
    this.x=x;
    this.y=y;
    this.z=z;
    this.size=size;
    // 衛星距離旋轉中心的x距離
    this.cdx=cdx;
    // 隨機產生物件顏色
    this.cc = color(0,255,random(255));
  }
  display(){
    push();
      rotateZ(frameCount*0.01);
      translate(this.cdx,0,0);  
      fill(this.cc);
      noStroke();
       rotateX(frameCount * 0.01);
       rotateZ(frameCount * 0.01);
        rotateY(millis() / 1000);
        sphere();

    pop();
  }
}
