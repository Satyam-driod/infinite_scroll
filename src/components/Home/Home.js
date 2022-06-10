import React,{Component} from 'react'
import {Container} from 'react-bootstrap';
import { Card, CardImg,CardBody,
  CardTitle, CardSubtitle } from 'reactstrap';
import axios from 'axios';
import './Home.css';
 class Home extends Component {
  constructor() {
    super();
    this.state = {
      userList: [],
      loading: false,
      page: 0,
      prevY: 0
    };
  }

  getuserList(){
    this.setState({ loading: true });
    const url=`https://randomuser.me/api/?page=${this.state.page}&results=20`
    axios.get(url)
        .then((response)=>
        {
          // console.log(page)
            // console.log(movies.length);
            this.setState({ userList: [...this.state.userList, ...response.data.results] })
            // console.log(this.state.movies)
            this.setState({loading:false});
        })
          .catch(error=>{console.log(error)})
  }

  componentDidMount() {
    this.getuserList(this.state.page);

    var options = {
      root: null,
      rootMargin: "0px",
      threshold: 1.0
    };
    
    this.observer = new IntersectionObserver(
      this.handleObserver.bind(this),
      options
    );
    this.observer.observe(this.loadingRef);
  }

  handleObserver(entities, observer) {
    const y = entities[0].boundingClientRect.y;
    if (this.state.prevY > y) {
      if(this.state.page<400){
        const curPage=this.state.page+1;
        this.getuserList(curPage);
        this.setState({ page: curPage });
      }
    }
    this.setState({ prevY: y });
  }

  render() {
    const loadingCSS = {
      height: "200px",
      margin: "30px",
      display:"flex",
      justifyContent:"center"
    };
    const loadingTextCSS = { display: this.state.loading ? "block" : "none",
                              border: "16px solid #f3f3f3", 
                              borderTop: "14px solid #9E9E9E",
                              borderRadius: "50%",
                              width: "120px",
                              height: "120px",
                              animation: "spin 2s linear infinite" 
                            };
    return (
      <Container>
        <Container className='wrapper'>
          {this.state.userList.map((user) => (
          <Card className='card' >
          <CardImg top width="100%" src={`${user.picture.large}`} alt="Card image cap" />
          <CardBody>
            <CardTitle>{user.name.first}</CardTitle>
            <CardSubtitle>{user.phone}</CardSubtitle>
            <CardSubtitle>{user.email}</CardSubtitle>
            {/* <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
            <Button>Button</Button> */}
          </CardBody>
        </Card>
        ))}
        </Container>
        <div
          ref={loadingRef => (this.loadingRef = loadingRef)}
          style={loadingCSS}
        >
          <span style={loadingTextCSS}></span>
        </div>
      </Container>
    )
  }
}

export default Home