import React, { Component } from 'react';
import { Header, Grid, Card, Segment, Image, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { fetchRestaurants } from '../actions/restaurant';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroller';

class Restaurants extends Component {
  state = { page: 1, hasMore = true };

  componentDidMount() {
    this.props.dispatch(fetchRestaurants());
  }

  rate = (restaurant, rating = 0) => {
    let myRating = { id: null };
    const { user: { id } } = this.props;
    myRating = restaurant.likes.find(like => like.user_id === id)
    if (!myRating)
      myRating = restaurant.dislikes.find(dislike => dislike.user_id === id)
    let query = myRating ? `?id=${myRating.id}` : '';

    const params = { restaurant_rating: { user_id: id, restaurant_id: restaurant.id, rating } }
    axios.put(`/api/restaurant_rating${query}`, params)
      .then(res => {
        // figure out how to update the ui without a refresh
        this.props.dispatch({ type: 'SET_RESTAURANTS', restaurants: res.data })
      })
      .catch(err => {
        // TODO: set error flash message
      })
  }

  ratingDisplay = (restaurant) => {
    let likeStyle, dislikeStyle = {};
    const { user: { id } } = this.props;

    if (id) {
      restaurant.likes.forEach(like => {
        likeStyle = like.user_id === id ? { color: 'green' } : {}
      })
      restaurant.dislikes.forEach(dislike => {
        dislikeStyle = dislike.user_id === id ? { color: 'red' } : {}
      })

      return (
        <Grid centered>
          <Grid.Row>
            <Grid.Column width={8} style={{ textAlign: 'center' }}>
              <a onClick={() => this.rate(restaurant, 1)} style={likeStyle}>
                <Icon name='thumbs outline up' />
                {restaurant.likes.length} Likes
              </a>
            </Grid.Column>
            <Grid.Column width={8} style={{ textAlign: 'center' }}>
              <a onClick={() => this.rate(restaurant)} style={dislikeStyle}>
                <Icon name='thumbs outline down' />
                {restaurant.dislikes.length} Dislikes
              </a>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      )
    } else
      return (<p style={{ color: 'red' }}>Login To View Rating</p>)
  }

  displayRestaurants = () => {
    return this.props.restaurants.map(restaurant => {
      return (
        <Card>
          <Image src={restaurant.main_image} />
          <Card.Content>
            <Card.Header>
              {restaurant.name}
            </Card.Header>
            <Card.Meta>
              <span className='date'>
                Added: {restaurant.added_on}
              </span>
            </Card.Meta>
            <Card.Description>
              {restaurant.description}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            {this.ratingDisplay(restaurant)}
          </Card.Content>
        </Card>
      );
    })
  }

  loadFunc = () => {
    // make axios call to the next page of results and dispatch setRestaurants action
    axios.get(`/api/restaurants?page=${this.state.page + 1}`)
      .then( res => {
        this.props.dispatch({ type: 'MORE_RESTAURANTS', restaurant: res.data.restaurants });
        this.setState({ page: this.state.page + 1, hasMore: res.data.has_more })
      }).catch( err => {
        // TODO: set fail flash message
    });
  }

  render() {
    const { page, hasMore } = this.stage;
    return (
      <Segment basic>
        <Header as='h1' textAlign='center'>Restaurants</Header>
        <Card.Group stackable textAlign='center' itemsPerRow={3}>
          <InfiniteScroll
            pageStart={page}
            loadMore={this.loadFunc}
            hasMore={hasMore}
            loader={<div className="loader">Loading ...</div>}
          >
            {this.displayRestaurants()}
          </InfiniteScroll>
        </Card.Group>
      </Segment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    restaurants: state.restaurants,
    user: state.user,
  }
}

// passing dispatch as a prop into our wrapped component
export default connect(mapStateToProps)(Restaurants);

// <Restaurants dispatch={connect.dispatch} user={} restaurants={[{}, {}, {}, {}]} />