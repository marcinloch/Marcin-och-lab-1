let imgSrc
let canvas
let ctx
let szerokosc
let wysokosc
let zdjecie
let zdjecie_data
let oryginal

function rozpocznij(zdjecie){
        canvas = document.querySelector('#ps');
        ctx = canvas.getContext('2d');
        imgSrc = zdjecie

        let img = new Image();
        img.src = imgSrc

        let szerokosc = window.innerWidth

        if(szerokosc>800){
            szerokosc=800
        }
        
        
        document.querySelector('#ps').style.width=szerokosc-10
        document.querySelector('#ps').style.height=wysokosc

        document.getElementById('bannerImg').style.width=szerokosc/3
        document.getElementById('bannerImg').style.height=wysokosc/3


        img.addEventListener('load',()=>{
            ctx.drawImage(img, 0,0,canvas.width,canvas.height)
        })

        oryginal = ctx.getImageData(0,0,canvas.width,canvas.height);
    }



function readURL(input) 
{
    let szerokosc = window.innerWidth
    if(szerokosc>800)
        szerokosc=800
    
    document.getElementById("bannerImg").style.display = "block";
    document.getElementById("bannerImg").style.width = szerokosc-10;
    wysokosc = document.getElementById('bannerImg').height;
    const img = document.querySelector("uploadBannerImage")
    console.dir(img)
   

    if (input.files && input.files[0]) {
        let reader = new FileReader();

        reader.onload = function (e) {
            document.getElementById('bannerImg').src =  e.target.result;
            
            
            zdjecie = document.querySelector('bannerImg')
            
            rozpocznij(e.target.result);
        }

        reader.readAsDataURL(input.files[0]);
    }
}



// wywoływanie funkcji grafiki 
{

document.querySelector('#run')
.addEventListener('click',()=>{brightnessChange(10)})

 document.querySelector('#ciemno')
.addEventListener('click',()=>{brightnessChangeLower(10)})

document.querySelector('#dodajkontrast')
.addEventListener('click',()=>{contrastChangeUp(10)})

document.querySelector('#odejmijkontrast')
.addEventListener('click',()=>{contrastChangedown(10)})

document.querySelector('#rozmyj')
.addEventListener('click',()=>{rozmyj()})

document.querySelector('#sepia')
.addEventListener('click',()=>{sepia(16)})

document.querySelector('#negatyw')
.addEventListener('click',()=>{negatyw()})

document.querySelector('#back')
.addEventListener('click',()=>{back()})

}


function negatyw(){
    let imageData = ctx.getImageData(0,0,canvas.width,canvas.height);
    let red,green,blue
    
    for(let i=0;i<imageData.data.length;i+=4){

        red = imageData.data[i]
        green = imageData.data[i+1]
        blue = imageData.data[i+2]

        imageData.data[i] = green
        imageData.data[i+1] = blue
        imageData.data[i+2] = red
    }
    ctx.putImageData(imageData,0,0)
    console.log(imageData)
}

function sepia(poziom){
    let imageData = ctx.getImageData(0,0,canvas.width,canvas.height);

    for(let i=0;i<imageData.data.length;i+=4){
        
        imageData.data[i]+=poziom
        imageData.data[i+1]+=poziom/2+2
        imageData.data[i+2] -=3
    }
    ctx.putImageData(imageData,0,0)
    console.log(imageData)
}

function rozmyj(){
    // pobranie pikseli z canvas
    let imageData = ctx.getImageData(0,0,canvas.width,canvas.height);
    let srednia1,srednia2,srednia3;

    for(let i =0 ;i<imageData.data.length;i+=4)
    {
        srednia1+=imageData.data[i]
        srednia2+=imageData.data[i+1]
        srednia3+=imageData.data[i+2]

        srednia1+=imageData.data[i+4]
        srednia2+=imageData.data[i+5]
        srednia3+=imageData.data[i+6]
        
        srednia1+=imageData.data[i+(600*4)]
        srednia2+=imageData.data[i+1+(600*4)]
        srednia3+=imageData.data[i+2+(600*4)]

        srednia1+=imageData.data[i-(600*4)]
        srednia2+=imageData.data[i+1-(600*4)]
        srednia3+=imageData.data[i+2-(600*4)]


        imageData.data[i]=srednia1/4;
        imageData.data[i+1]=srednia2/4;
        imageData.data[i+2]=srednia3/4;
        

        srednia1=0
        srednia2=0
        srednia3=0
    }
    //wpisujemu do canvasa
    ctx.putImageData(imageData,0,0)
    console.log(imageData)
}

function contrastChangedown(ile){
    // pobranie pikseli z canvas
    let imageData = ctx.getImageData(0,0,canvas.width,canvas.height);
    let srednia;

    for(let i =0 ;i<imageData.data.length;i+=4)
    {
        srednia+=imageData.data[i]
        srednia+=imageData.data[i+1]
        srednia+=imageData.data[i+2]
        srednia/=3
        if(srednia>127){
            imageData.data[i]-=ile
            imageData.data[i+1]-=ile
            imageData.data[i+2]-=ile
        }
        if(srednia<127){
            imageData.data[i]+=ile
            imageData.data[i+1]+=ile
            imageData.data[i+2]+=ile
        }
        srednia=0
    }
    //wpisujemu do canvasa
    ctx.putImageData(imageData,0,0)
    console.log(imageData)
}

function contrastChangeUp(ile){
    // pobranie pikseli z canvas
    let imageData = ctx.getImageData(0,0,canvas.width,canvas.height);
    let srednia;

    for(let i =0 ;i<imageData.data.length;i+=4)
    {
        srednia+=imageData.data[i]
        srednia+=imageData.data[i+1]
        srednia+=imageData.data[i+2]
        srednia/=3
        if(srednia>127){
            imageData.data[i]+=ile
            imageData.data[i+1]+=ile
            imageData.data[i+2]+=ile
        }
        if(srednia<127){
            imageData.data[i]-=ile
            imageData.data[i+1]-=ile
            imageData.data[i+2]-=ile
        }
        srednia=0
    }
    //wpisujemu do canvasa
    ctx.putImageData(imageData,0,0)
    console.log(imageData)
}

function brightnessChangeLower(factor){
    // pobranie pikseli z canvas
    let imageData = ctx.getImageData(0,0,canvas.width,canvas.height);
    
    for(let i =0 ;i<imageData.data.length;i+=4)
    {
        imageData.data[i]-=factor;
        imageData.data[i+1]-=factor;
        imageData.data[i+2]-=factor;
        
    }
    //wpisujemu do canvasa
    ctx.putImageData(imageData,0,0)
    console.log(imageData)
}

function brightnessChange(factor){
    // pobranie pikseli z canvas
    console.log(factor)
    let imageData = ctx.getImageData(0,0,canvas.width,canvas.height);
    console.dir(imageData)

    for(let i =0 ;i<imageData.data.length;i+=4)
    {
        imageData.data[i]+=factor;
        imageData.data[i+1]+=factor;
        imageData.data[i+2]+=factor;
        
    }
    //wpisujemu do canvasa
    ctx.putImageData(imageData,0,0)
    console.log(imageData)
}