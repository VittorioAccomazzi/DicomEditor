import React from "react";
import blue from "@material-ui/core/colors/blue";
import AppMain from  './features/appMain/appMain';
import {
  createTheme,
  withStyles,
  createStyles,
  Theme,
  WithStyles,
  StyleRules
} from "@material-ui/core/styles";
import {
  MuiThemeProvider,
  CssBaseline,
} from "@material-ui/core";


const theme = createTheme({
  palette: {
    primary: blue,
    secondary: {
      main: "#fff"
    },
    background: {
      default: "#fff"
    }
  }
});

const styles: (theme: Theme) => StyleRules<string> = theme =>
  createStyles({
    app: {
      textAlign: "center" 
    },
    main :{
      position:'absolute',
      top:'0px',
      right: '0px',
      left:'0px',
      bottom: '0px',
      background : 'white',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }
  });

type AppProps = {} & WithStyles<typeof styles>;
const App = ({ classes }: AppProps) => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <div className={classes.app}>
      <div className={classes.main}>
        <AppMain />
      </div>
    </div>
  </MuiThemeProvider>
);

export default withStyles(styles)(App);
