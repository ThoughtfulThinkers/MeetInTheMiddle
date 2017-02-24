#Meetup in the Middle [![Build Status](https://travis-ci.org/ThoughtfulThinkers/MeetInTheMiddle.svg?branch=master)](https://travis-ci.org/ThoughtfulThinkers/MeetInTheMiddle)
![Meetup in the Middle](/assets/images/MeetInTheMiddleLogo.png)

[Android]( https://play.google.com/store/apps/details?id=io.nickcoleman.meetinthemiddle "Android")

[IOS]() 

## Description

Schedule an event and invite your friends. Meetup in the Middle will select a location for you based on where your guests are coming from and the type of venue you've chosen.

## Screenshots

### Main Page

### Meetup

### Login

## Testing

Pull the repository, run `npm install`, and then `npm test`. 

Note that if you use Genymotion to simulate Meetup in the Middle for Android that Genymotion requires extra configuration to [enable Google Play Services](https://www.genymotion.com/help/desktop/faq/#google-play-services "enable Google Play Services"). 

## Tech Stack

- DB: Firebase

- Client: React-Native, React, Redux, Thunk

- Testing: Jest

- Development Environment: Exponent

## Database Structure

#### `chatrooms`

```
  abc123: {
    321efg: {
      createdAt: 1487360561315
      text: "Can't wait to see you!"
      user: {
        _id: 123abcd45ef
        name: "chat"
        }
      }
   }
```

#### `users`

```
  -123abcd45ef: {
      firstName: "Joe"
      lastName: "User"
      location: {
        _id: r327t2r73rg
        name: "chat"
        }
       meetups: {
        - abc123: {
          lat: 39.9524
          lon: 75.1636
          uid: abc123
          }
        }
        uid: 123abcd45ef
      }
   } 
 ```

#### `meetups`

```
- abc123: {
  name: "Art Party"
  description: "Wear clothes for painting and bring a snack"
  start: "2017-03-20 06:28"
  end: "2017-03-20 22:00"
  state: "Pennsylvania"
  status: "voting"
  voteStart: "2017-02-20 06:00"
  voteEnd: "2017-03-15 06:00"
  venue: {
    id: "outdoors"
    name: "Outdoors"
    }
  venues: {
    -987zyx: {
      formattedAddress: 
      lat: 39.9522
      lon: 75.1635
      name: "Art Studio"
      votes: 1
      }
    }
  location: ""
  attendingNames: {
    123abcd45ef: "Joe User"
    345abc765ab: "Sam LateRsvp" 
  }
  users: {
    123abcd45ef: {
       lat: 39.9524
       lon: 75.1636
       uid: 123abcd45ef
       name: "Joe User"
       vote: 987zyx
    }
  }
}


```
