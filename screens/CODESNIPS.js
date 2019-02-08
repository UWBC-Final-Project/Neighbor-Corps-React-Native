<CardItem>
  <Left>
    <Button transparent textStyle={{ color: '#87838B' }}>
      {/* <Icon name="eye" /> */}
      <Icon.Ionicons name={Platform.OS === 'ios' ? 'ios-eye' : 'md-eye'} size={20} />
      <Text>7</Text>
      {/* replace with dynamic property once up and running in the database */}
      {/* <Text>seen by {this.props.taskProps.usersInvolved}</Text> */}
    </Button>
    <Button transparent textStyle={{ color: '#87838B' }}
      onPress={() => this.props.stackNav(this.props.taskProps._id, this.props.taskProps)}>
      {/* <Icon name="right" /> */}
      <Icon.Ionicons name={Platform.OS === 'ios' ? 'ios-arrow-round-forward' : 'md-arrow-round-forward'} size={20} />
      <Text>Details</Text>
    </Button>
  </Left>
</CardItem>


  ///////////////////////

  <CardItem >
    <Left >
      {/* <Thumbnail source={{ uri: 'https://allthatsinteresting.com/wordpress/wp-content/uploads/2015/10/nanjing-littering-in-china.jpg' }} /> */}
      <Body>
        <Text style={styles.taskTitle}>{this.props.taskProps.title}</Text>
        <Text style={styles.postDate} note>{this.props.taskProps.postDate}</Text>
        <Text style={styles.createdBy}>Posted By: {this.props.taskProps.postedBy.username}</Text>
      </Body>
    </Left>
  </CardItem>
  <CardItem>
    <Body>
      <Image source={{ uri: this.props.taskProps.imageURL }}
        style={{ height: 200, width: 300, flex: 1, marginLeft: 35 }}
      />
      <Text style={styles.description}>
        {this.props.taskProps.description}
      </Text>
    </Body>
  </CardItem>
  <CardItem>
    <Button transparent textStyle={{ color: '#87838B' }}>
      {/* <Icon name="eye" /> */}
      <Icon.Ionicons name={Platform.OS === 'ios' ? 'ios-eye' : 'md-eye'} size={20} />
      <Text>7</Text>
      {/* replace with dynamic property once up and running in the database */}
      {/* <Text>seen by {this.props.taskProps.usersInvolved}</Text> */}
    </Button>
    <Button transparent textStyle={{ color: '#87838B' }}>
      {/* <Icon name="flag" /> */}
      <Icon.Ionicons name={Platform.OS === 'ios' ? 'ios-flag' : 'md-flag'} size={20} />
      <Text>Confirm Issue</Text>
    </Button>
  </CardItem>