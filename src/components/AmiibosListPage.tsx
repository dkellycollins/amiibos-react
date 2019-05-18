import React, { SFC, useState, useEffect } from "react";
import { flowRight } from 'lodash';
import AmiibosService from "../services/AmiibosService";
import AmiiboModel from "../services/AmiiboModel";
import { 
  List, 
  ListItem, 
  ListItemText, 
  ListItemSecondaryAction, 
  ListItemAvatar, 
  Switch, 
  Typography, 
  StyledComponentProps, 
  withStyles, 
  AppBar, 
  Toolbar, 
  Avatar,
  StyleRulesCallback
} from "@material-ui/core";

const styles: StyleRulesCallback = () => ({
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  }
});

export const AmiibosListPage: SFC = flowRight(
  withStyles(styles)
)(({ classes = {} }: StyledComponentProps) => {
  const [amiibos, setAmiibos] = useState<Array<AmiiboModel>>([]);

  useEffect(() => {
    setAmiibos(AmiibosService.instance.getAmiibos());
  }, []);

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            Amiibos
          </Typography>
        </Toolbar>
      </AppBar>
      <List>
        {amiibos.map(amiibo => (
          <ListItem key={amiibo.slug}>
            <ListItemAvatar>
              <Avatar src={amiibo.figureUrl} />
            </ListItemAvatar>
            <ListItemText primary={amiibo.name} secondary={amiibo.series} />
            <ListItemSecondaryAction>
              <Switch />
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit">Collected 0 out of {amiibos.length}</Typography>
        </Toolbar>
      </AppBar>
    </>
  );
});

export default AmiibosListPage;