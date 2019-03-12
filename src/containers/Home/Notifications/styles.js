import { Colors } from "../../../themes";
export const styles = {
  MainContainer: {
    justifyContent: "center",
    flex: 1,
    paddingTop: 30
  },
  imageThumbnail: {
    justifyContent: "center",
    alignItems: "center",
    height: 100
  },
  circular_container: {
    height: 60,
    width: 60,
    backgroundColor: "transparent",
    borderWidth: 1,
    alignSelf: "center",
    justifyContent: "center",
    borderColor: Colors.border,
    borderRadius: 30
  },
  status_container: {
    backgroundColor: Colors.border,
    marginTop: 6,
    width: 120,
    height: 28,
    borderWidth: 0.5,
    borderColor: Colors.border,
    borderRadius: 14
  },
  time_ago: {
    marginTop: 8,
    color: "#fff",
    fontSize: 10,
    alignSelf: "flex-end"
  },
  client_name: {
    color: "#fff",
    marginLeft: 5,
    fontSize: 16,
    marginBottom:2,
    alignSelf: "flex-end"
  }
};