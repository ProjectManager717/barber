import { StyleSheet } from 'react-native';
import { Colors, Metric } from '../../../themes';

export const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    backgroundColor: '#131947'
  },
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  backgroundImg: {
    height: 160,
    resizeMode: 'stretch'
  },
  mainContainer: {
    flex: 1,
    marginTop: 80,
    alignItems: 'center'
  },
  titleText: {
    ...Metric.font.big,
    color: Colors.white,
    textAlign: 'center',
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 50,
    backgroundColor: Colors.background
  },
  closeContainer: {
    alignItems: 'flex-end',
    marginRight: Metric.marginHorizontal
  },
  whiteText: {
    ...Metric.font.h4,
    color: Colors.white,
    textAlign: 'center'
  },
  btnContainer: {
    marginTop: Metric.height / 10
  },
  inputContainer: {
    height: 45,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    flexDirection: 'row',
    paddingVertical: 5,
    marginBottom: Metric.height / 30
  },
  countryCodeContainer: {
    marginLeft: 5,
    paddingRight: 10,
    borderRightWidth: 1,
    borderRightColor: Colors.border,
    marginBottom: 5
  },
  input: {
    marginLeft: 10,
    width: Metric.width / 5 * 2.5,
    ...Metric.font.big,
    color: Colors.white
  }
});

