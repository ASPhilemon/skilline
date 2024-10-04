import { Navbar, Container, Nav, Button, Row, Col } from "react-bootstrap"
import styles from "./home.module.css"
import { useState, useRef, useEffect} from "react";
import { X } from "react-bootstrap-icons";
import { Plus } from "react-bootstrap-icons";

export function Home(){
  return(
    <>
      <NavBar/>
      <Hero/>
      <Companies/> 
    </>
 
  )
}

function NavBar() {
  const [expanded , setExpanded] = useState(false)
  const togglerRef = useRef(null)

  useEffect(()=> {
    document.addEventListener("mousedown", handleClickOutside)
    return ()=> document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  function handleClickOutside(e){
    if (! togglerRef.current.contains(e.target)) setExpanded(false)
  }

  return (
    <Navbar
      style={{height: "65px"}}
      collapseOnSelect
      expand = "lg"
      expanded = {expanded}
      onToggle={(val)=>setExpanded(val)}
      className="bg-primary-light py-lg-3 align-items-center"
    >
      <Container fluid className="justify-content-start align-items-center px-lg-5" >
        
        <Navbar.Toggle
          ref={togglerRef}
          className={`${expanded ? styles["navbar-toggler-on"] : styles["navbar-toggler-off"]}`}
          aria-controls="responsive-navbar-nav"
          children = { expanded && <X className= {"menu-close-icon"} size={32} />}
        />
        <Navbar.Brand
          className= {`ms-2 ms-md-3 position-relative}`}
          href="#home"
        >
          <img src="/logo1.svg" width={85}   alt="logo" />
        </Navbar.Brand>
        
        <div className={`ms-auto ms-lg-0 order-lg-1 ${styles["account-btns"]}`}>
          <Button variant="light" className="me-2 rounded-pill" size="sm" >Log In</Button>
          <Button size="sm" className="rounded-pill"  >Sign Up</Button>
        </div>
        <div className="w-100 d-lg-none"></div>

        <Navbar.Collapse id="responsive-navbar-nav" className="flex-grow-0 ms-lg-auto me-lg-5">
          <Nav defaultActiveKey={"home"} className="">
            <Nav.Link eventKey={"home"} className="mb-2"  href="#home">Home</Nav.Link>
            <Nav.Link eventKey={"careers"} className="mb-2"  href="#careers">Careers</Nav.Link>
            <Nav.Link eventKey={"blog"} className="mb-2"  href="#blog">Blog</Nav.Link>
            <Nav.Link eventKey={"about"}   href="#about-us">About Us</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

function Hero(){
  return(
    <section className={`px-3 pt-4 pt-lg-0 px-md-5 ${styles["hero"]}`}>
      <Row xs={1} md={2} className="align-items-center" >
        <Col className="text-center text-md-start">

          <h1 style={{fontSize: "25px"}} className="display-6 mb-3 fw-bold" >
            <span className="text-primary">Studing</span> 
            <span className="text-secondary"> Online <br/>is now much easier</span>
          </h1>
          <p style={{fontSize: "16px"}} className="fw-light lead mb-2 mb-lg-4 px-3 px-md-0">Skilline is an interesting platform that will teach you in more an interactive way</p>
          <Button className="rounded-pill shadow-lg" >Join for free</Button>
          <Button
            className="rounded-circle ms-3"
            variant="light"
            style={{width: 40, height: 40}}
          >
            <img className="me-2" width={15} height={15} src="/play.svg" alt="" />
          </Button> <span style={{fontSize: "12px"}} className="text-secondary" >Watch how it works</span>
        </Col>
        <Col className="text-center mt-4 mt-lg-0">
          <img className={`${styles["hero-img"]}`} width={350} height={400} style = {{maxWidth: "100%"}} src="/hero2.png" alt="a girl holding books" />
        </Col>
      </Row>
    </section>
  )
}

function Companies(){
  const [count, setCount] = useState(1000)
  const [inView, setInView] = useState(false)
  const countRef = useRef(null)

  useEffect(()=> {
    let timeoutId
    function animateCount(){
      const step = 20;
      if (count + step <= 5000) setCount(count+step); else setCount(5000)
    }
    if (inView){
      timeoutId = setTimeout(()=>{
        animateCount()
      }, 10)
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true)
        observer.unobserve(countRef.current)
      }
    },{ threshold: 1, rootMargin:"-20px" });

    observer.observe(countRef.current)

    return ()=> {
      clearTimeout(timeoutId)
      observer.unobserve(countRef.current)
    } 
  }, [count, inView])

  return(
    <section className="text-center mt-5">
      <p className="lead mb-3 px-2">
        Trusted by 
        <span ref={countRef} style={{width: "100px", fontSize: "25px"}} className="fw-bold ms-2 d-inline-block">
          {count}{ count === 5000 && <Plus size={30} />}
        </span>
        companies worldwide
      </p>
      <div className={`px-4 ${styles["companies"]} `}>
        <img className="me-4" src="/google.svg" alt="" />
        <img className="me-4" src="/netflix.svg" alt="" />
        <img className="me-4" src="/airbnb.svg" alt="" />
        <img className="me-4" src="/amazon.svg" alt="" />
        <img className="me-4" src="/facebook.svg" alt="" />
        <img  src="/grab.svg" alt="" />
      </div>
    </section>
  )
}


