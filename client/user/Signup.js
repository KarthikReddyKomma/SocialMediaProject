import React from 'react'
import { useState } from 'react'
import { Card } from '@material-ui/core'
import { CardContent } from '@material-ui/core'
import { Typography } from '@material-ui/core'
import { TextField } from '@material-ui/core'
import { CardActions } from '@material-ui/core'
import { Button } from '@material-ui/core'
import { Icon } from '@material-ui/core'
import { create } from './api-user'
import { Dialog } from '@material-ui/core'
import { DialogTitle } from '@material-ui/core'
import { DialogContent } from '@material-ui/core'
import { DialogContentText } from '@material-ui/core'
import { DialogActions } from '@material-ui/core'
import Link from "react-router-dom/Link"
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    card: {
      maxWidth: 600,
      margin: 'auto',
      textAlign: 'center',
      marginTop: theme.spacing(5),
      paddingBottom: theme.spacing(2)
    },
    error: {
      verticalAlign: 'middle'
    },
    title: {
      marginTop: theme.spacing(2),
      color: theme.palette.openTitle
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 300
    },
    submit: {
      margin: 'auto',
      marginBottom: theme.spacing(2)
    }
  }))

export default function Signup () {
    const classes = useStyles ()
    const [values, setValues] = useState ({
        name: '',
        password: '',
        email: '',
        open:false,
        error:'' 
    })

    const handleChange = name => event => {
        setValues ({...values, [name] : event.target.value})
    }

    const clickSubmit = () => {
        const user = {
            name : values.name || undefined,
            email : values.email || undefined,
            password : values.password || undefined 
        }

        create (user).then (data => {
            if (data.error)
                setValues ({...values, error: data.error})
            else
                setValues ({ ...values, error:'', open: true})
        })
    }

    return (
        <div>
            <Card className = {classes.card}>
                <CardContent>
                    <Typography variant = "h6" className = {classes.title}>
                        Sign Up
                    </Typography>
                    <TextField id = "name" label = "name"
                        className = {classes.textField} values = {values.name} onChange = {handleChange('name')} margin = "normal" />
                    <br/>
                    <TextField id = "email" type = "email" label = "email"
                        className = {classes.textField} values = {values.email} onChange = {handleChange('email')} margin = "normal" />
                    <br/>
                    <TextField id = "password" type = "password" label = "password"
                        className = {classes.textField} values = {values.password} onChange = {handleChange('password')} margin = "normal" />
                    <br/>

                    {
                    values.error && (<Typography component = "p" color = "error">
                                    <Icon color = "error" className = {classes.error}>error</Icon>
                                    {values.error}
                                    </Typography>)
                    }
                </CardContent>
                
                <CardActions>
                        <Button color = "primary" variant = "conatined" onClick = {clickSubmit} className = {classes.submit}>Submit </Button>
                </CardActions>
            </Card>

            <Dialog open = {values.open} disableBackdropClick = {true}>
                <DialogTitle> New Account</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        New Account create successfully
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Link to="/signin">
                        <button color = "primary" autoFocus = "autoFocus" variant = "contained">
                            Sign In
                        </button>
                    </Link>
                </DialogActions>
            </Dialog>
        </div>
    )
}