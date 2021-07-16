import React, {useState, useEffect} from "react"
import auth from '../auth/auth-helper'
import { Paper } from "@material-ui/core"
import { IconButton} from "@material-ui/core"
import { Typography } from "@material-ui/core"
import {List} from "@material-ui/core"
import { ListItemText } from "@material-ui/core"
import {ListItem} from "@material-ui/core"
import { ListItemAvatar } from "@material-ui/core"
import { Avatar } from "@material-ui/core"
import { Person } from "@material-ui/icons"
import { Divider } from "@material-ui/core"
import { Edit } from "@material-ui/icons"
import DeleteUser from './DeleteUser'
import {read} from './api-user'
import { Redirect, Link } from "react-router-dom"
import { ListItemSecondaryAction } from "@material-ui/core"
import { makeStyles } from "@material-ui/core"

const useStyles = makeStyles(theme => ({
    root: theme.mixins.gutters({
      maxWidth: 600,
      margin: 'auto',
      padding: theme.spacing(3),
      marginTop: theme.spacing(5)
    }),
    title: {
      marginTop: theme.spacing(3),
      color: theme.palette.protectedTitle
    }
  }))

export default function Profile ({match}) {

    const classes = useStyles ()
    const [user,setUser] = useState ({})
    const [redirectToSignIn, setRedirectToSignIn] = useState (false)

    useEffect (() => {
        const abortController = new AbortController ()
        const signal = abortController.signal

        const jwt = auth.isAuthenticated ()
        console.log ("jwt of signin", jwt)
        read ({
            userId : match.params.userId
        }, {t : jwt.token}, signal).then (data => {

            if (data && data.error) {
                console.log ("error while reading", data.error)
                setRedirectToSignIn(true)
            }
            else   {
                console.log ("Profliel data", data)
                setUser(data)
            }
                
            
        })
    return function cleanup () {
        abortController.abort ()
        }
    }, [match.params.userId])

    if (redirectToSignIn) {
        return <Redirect to='/signin'/>
    }

    return (
        <Paper className = {classes.root} elevation ={4}>
            <Typography variant = "h6" className = {classes.title}>
                Profile
            </Typography>

            <List dense>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <Person/>
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary = {user.name} secondary = {user.email}/>
                    {
                        auth.isAuthenticated ().user && auth.isAuthenticated ().user._id == user._id &&
                        (<ListItemSecondaryAction>
                            <Link to = {"/user/edit/" + user._id}>
                            <IconButton aria-label = "Edit" color= "primary">
                                <Edit/>
                            </IconButton>
                        </Link>
                        <DeleteUser userId = {user._id}/>
                        </ListItemSecondaryAction>)
                    }

                </ListItem>
                <Divider/>
                <ListItem>
                    <ListItemText primary = {"Joined: " + (new Date (user.created)).toDateString ()}/>
                </ListItem>
            </List>
        </Paper>
    )
} 