import React, { useState, useEffect } from 'react'
import firebase from '../firebase'
import { withRouter } from 'react-router-dom'
import { Table, Paper, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

import NavBar from '../NavBar'

const styles = theme => ({
    root: {
        margin: 'auto',
        width: '75%',
    },
    container: {
        maxHeight: -1,
    },
    rankings: {
        padding: '3%'
    }
})

const columns = [
    { id: 'name', label: 'Name', minWidth: 170},
    { id: 'score', label: 'Score', minWidth: 170, align: 'right', format: value => value.toLocaleString()}
]


function Rankings(props) {
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)
    const [rows, setRows] = useState([])

    useEffect(() => {
        firebase.getRowRankingData().then(res => {
            res.sort((a, b) => a.score > b.score ? -1 : 1)
            setRows(res)
        })
    }, [])

    const handlePageChange = (e, newPage) => {
        setPage(newPage)
    }

    const handleRowsPerPageChange = e => {
        setRowsPerPage(+e.target.value)
        setPage(0)
    }
    
    const { classes } = props
    return (
        <div>
            <NavBar />
            <Typography color="textSecondary" align="center" component="h1" variant="h1" >
                Ranks
            </Typography>
            <div className={classes.rankings}>
                <Paper className={classes.root}>
                    <TableContainer className={classes.container}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    {columns.map(column => (
                                        <TableCell
                                            key={column.id}
                                            align={column.align}
                                            style={{}}
                                        >
                                            {column.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.abc}>
                                            {columns.map(column => {
                                                const value = row[column.id]
                                                return (
                                                    <TableCell key={column.id} align={column.align}>
                                                        {column.format && typeof value === 'number' ? column.format(value) : value}
                                                    </TableCell>
                                                )
                                            })}
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25, 100, 1000000000000]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handlePageChange}
                        onChangeRowsPerPage={handleRowsPerPageChange}
                    />
                </Paper>
            </div>
        </div>
    )                            
}

export default withRouter(withStyles(styles)(Rankings))