'use strict';

var React = require('react-native');
var {
    AppRegistry
  , Image
  , ListView
  , StyleSheet
  , Text
  , View
  , StatusBarIOS
  , TouchableHighlight
} = React;

var title = 'Awesome Project with React Native';

var API_KEY = '7waqfqbprs7pajbz28mqf6vz';
var API_URL =
  'http://api.rottentomatoes.com/api/public/v1.0/lists/movies/in_theaters.json';
var PARAMS = '?apikey=' + API_KEY;
var REQUEST_URL = API_URL + PARAMS;


var AwesomeProject = React.createClass({
  getInitialState: function() {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
    };
  },

  componentDidMount: function() {
    this.fetchData();
  },

  fetchData: function() {
    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData.movies),
          loaded: true,
        });
      })
      .done();
  },

  renderLoadingView: function() {
    return (
      <View style={styles.container}>
        <Text>
          Loading movies...
        </Text>
      </View>
    );
  },

  render: function() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      <View>
        <TouchableHighlight
          onPress={() => StatusBarIOS.setStyle(style)}>
          <View>
            <Text style={styles.statusbar}>{title}</Text>
          </View>
        </TouchableHighlight>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderMovie}
          style={styles.listView}
        />
      </View>
    );
  },

  renderMovie: function(movie) {
    return (
      <View style={styles.container}>
        <Image
          source={{uri: movie.posters.thumbnail}}
          style={styles.thumbnail}
        />
        <View style={styles.rightContainer}>
          <Text style={styles.title}>{movie.title}</Text>
          <Text style={styles.year}>{movie.year}</Text>
        </View>
      </View>
    );
  }
});


// Stylesheet
var styles = StyleSheet.create({
  wrapper: {
    borderRadius: 5,
    marginBottom: 5,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#32322C'
  },
  rightContainer: {
    flex: 1
  },
  title: {
    color: '#ffffff',
    fontSize: 20,
    marginBottom: 8,
    marginLeft: 8
  },
  year: {
    color: '#fff',
    marginLeft: 8
  },
  thumbnail: {
    width: 53,
    height: 81
  },
  statusbar: {
    color: '#ffffff',
    textAlign: 'center',
    backgroundColor: '#161613',
    padding: 10,
    paddingTop: 30
  },
  listView: {
    backgroundColor: '#32322C'
  },
});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
