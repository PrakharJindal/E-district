import React from "react";
import { Image, StatusBar, View } from "react-native";
import { Container, Content, Text, List, ListItem } from "native-base";
import { connect } from 'react-redux';



class SideBar extends React.Component {

  render() {
    return (
      <Container >
        <View style={{ paddingTop: StatusBar.currentHeight, backgroundColor: 'black' }} />
        <Content >
          <Image
            style={{
              height: 160,
              width: "100%",
              borderBottomLeftRadius: 10,
              borderBottomRightRadius: 10,
              position: 'relative',
              resizeMode: 'stretch',
              alignSelf: "center"
            }}
            source={{ uri: this.props.imageUrl }}
          />
          <List
            dataArray={this.props.routes}
            contentContainerStyle={{ marginTop: 20 }}
            renderRow={data => {
              return (
                <ListItem
                  button
                  onPress={() => this.props.navigation.navigate(data)}>
                  <Text style={{ color: 'black' }}>{data}</Text>
                </ListItem>
              );
            }}
          />
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    imageUrl: state.auth.imageUrl,
    routes: state.auth.routes
  }
}

export default connect(mapStateToProps)(SideBar);
