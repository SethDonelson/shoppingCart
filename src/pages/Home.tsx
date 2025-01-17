


export function Home() {

   const bgImg = {
    backgroundImage: "url('/images/bgWatch.jpg')",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    height: "100vh",
    width: "100vw"
   }

    return( 
    <>
     {/* <h1>Home</h1> */}
     <div className="w-100 m-0 p-0" style={bgImg} >

        <div className=" position-absolute top-50  translate-middletext-black" >
        <h1 style={{ fontWeight: 'bold'}} >Don't Be Late For The Holidays</h1>
        <h2 className="display-1" style={{ fontWeight: 'bold'}}>25% Off</h2>
        </div>
    </div>
    </>
    )
}



