import React, { SFC, useState, useEffect, Dispatch, SetStateAction } from "react";
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

interface AmiibosListPageState {
  amiibos: Array<AmiiboModel>;
  collectedAmiibos: Record<string, boolean>;
}

const initialState: AmiibosListPageState = {
  amiibos: [],
  collectedAmiibos: {}
}

const loadAmiibosListPageEffect =
  (setState: Dispatch<SetStateAction<AmiibosListPageState>>) =>
  () => {
    setState({
      amiibos: AmiibosService.instance.getAmiibos(),
      collectedAmiibos: UserAmiibosService.instance.load()
    });
  }

const saveCollectedAmiibos =
  debounce((collectedAmiibos: Record<string, boolean>) => {
    UserAmiibosService.instance.save(collectedAmiibos);
  }, 1000);

const onToggleAmiibo =
  (state: AmiibosListPageState, setState: Dispatch<SetStateAction<AmiibosListPageState>>, slug: string) =>
  (_: any, checked: boolean) => {
    const collectedAmiibos = {
      ...state.collectedAmiibos,
      [slug]: checked
    };

    setState({
      ...state,
      collectedAmiibos
    });
    saveCollectedAmiibos(collectedAmiibos);
  };

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
    const [state, setState] = useState<AmiibosListPageState>(initialState);

    useEffect(loadAmiibosListPageEffect(setState), []);

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
          {state.amiibos.map(amiibo => (
            <ListItem key={amiibo.slug}>
              <ListItemAvatar>
                <Avatar src={amiibo.figureUrl} />
              </ListItemAvatar>
              <ListItemText primary={amiibo.name} secondary={amiibo.series} />
              <ListItemSecondaryAction>
                <Switch 
                  checked={state.collectedAmiibos[amiibo.slug]}
                  onChange={onToggleAmiibo(state, setState, amiibo.slug)}
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