import React, { SFC, useState, useEffect } from "react";
import { flowRight, debounce } from 'lodash';
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
import UserAmiibosService from "../services/UserAmiibosService";

const saveCollectedAmiibos =
  debounce((collectedAmiibos: Record<string, boolean>) => {
    UserAmiibosService.instance.save(collectedAmiibos);
  }, 1000);

const styles: StyleRulesCallback = 
  () => ({
    root: {
      flexGrow: 1
    },
    grow: {
      flexGrow: 1
    }
  });

export const AmiibosListPage: SFC = flowRight(
  withStyles(styles)
)(
  function AmiibosListPage({ classes = {} }: StyledComponentProps) {
    const [amiibos, setAmiibos] = useState<Array<AmiiboModel>>([]);
    const [collectedAmiibos, setCollectedAmiibos] = useState<Record<string, boolean>>({});

    useEffect(() => {
      setAmiibos(AmiibosService.instance.getAmiibos());
      setCollectedAmiibos(UserAmiibosService.instance.load());
    }, []);
    useEffect(() => {
      saveCollectedAmiibos(collectedAmiibos);
    }, [collectedAmiibos]);

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
                <Switch 
                  checked={collectedAmiibos[amiibo.slug]}
                  onChange={(_, checked) => {
                    setCollectedAmiibos({
                      ...collectedAmiibos,
                      [amiibo.slug]: checked
                    });
                  }}
                />
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </>
    );
  }
);

export default AmiibosListPage;