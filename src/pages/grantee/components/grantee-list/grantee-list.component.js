import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { useSnackbar } from 'notistack'
import { lighten, makeStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TablePagination from '@material-ui/core/TablePagination'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Checkbox from '@material-ui/core/Checkbox'
import Tooltip from '@material-ui/core/Tooltip'
import DeleteIcon from '@material-ui/icons/Delete'
import GranteeEdit from './../grantee-edit/grantee-edit.component'
import BankIcon from './../../../../components/bank-icon/bank-icon.component'
import { getGrantees } from '../../../../gateways/grantee.gateway'
import DeleteConfirmationModal from './../delete-confirmation-modal/delete-confirmation-modal.component'

import transfeeraIcon from '../../images/logo-transfeera-vertical.png'

import './grantee-list.component.scss'
import { remove } from './../../../../gateways/grantee.gateway'

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const headCells = [
    { id: 'name', numeric: false, disablePadding: true, label: 'Favorecido' },
    { id: 'cpfCnpj', numeric: false, disablePadding: false, label: 'CPF / CNPJ' },
    { id: 'bank', numeric: false, disablePadding: false, label: 'Banco' },
    { id: 'agency', numeric: false, disablePadding: false, label: 'Agência' },
    { id: 'account', numeric: false, disablePadding: false, label: 'CC' },
    { id: 'status', numeric: false, disablePadding: false, label: 'Status do Favorecido' },
];

function GranteeListHead(props) {
    const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox" style={{ paddingLeft: '15px' }}>
                    <Checkbox
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{ 'aria-label': 'select all desserts' }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'default'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                            classes={classes.tableHeaderCell}
                        >
                            <label className="table-header">{headCell.label}</label>
                            {orderBy === headCell.id ? (
                                <span className={classes.visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </span>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

GranteeListHead.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    title: {
        flex: '1 1 100%',
    },
}));

const GranteeListToolbar = (props) => {
    const classes = useToolbarStyles();
    const { numSelected, handleDelete } = props;

    return (
        <Toolbar
            className={clsx(classes.root, {
                [classes.highlight]: numSelected > 0,
            })}
        >
            {numSelected > 0 && (
                <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
                    {numSelected} {numSelected === 1 ? 'selecionado' : 'selecionados'}
                </Typography>
            )}

            {numSelected > 0 && (
                <Tooltip title="Delete">
                    <IconButton aria-label="delete">
                        <DeleteIcon onClick={handleDelete} />
                    </IconButton>
                </Tooltip>
            )}
        </Toolbar>
    );
};

GranteeListToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%'
    },
    paper: {
        width: '100%'
    },
    table: {
        minWidth: 750,
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
    tableHeaderCell: {
        root: {
            backgroundColor: 'black'
        }
    }
}));

const GranteeList = ({ filter }) => {
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();

    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('name');
    const [rows, setRows] = React.useState([]);
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);

    const rowsPerPage = 10;
    const [editGranteeModalOpened, setEditGranteeModalOpened] = React.useState(false)
    const [deleteConfirmationModalOpened, setDeleteConfirmationModalOpened] = React.useState(false)
    const [selectedId, setSelectedId] = React.useState(undefined)

    useEffect(() => {
        getData()
    }, [filter])

    useEffect(() => {
        if (selectedId) {
            setEditGranteeModalOpened(true)
        }
    }, [selectedId])

    const getData = () => {
        setPage(0)
        getGrantees(filter).then(response => {
            setRows(response.data)
        })
    }

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = rows.map((n) => n._id);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleSelect = (event, _id) => {
        const selectedIndex = selected.indexOf(_id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, _id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleEditGrantee = (row) => {
        setSelectedId(row._id)
    }

    const handleCloseGranteeModal = () => {
        setSelectedId(undefined)
        setEditGranteeModalOpened(false)
    }

    const handleOpenDeleteConfirmationModal = () => {
        setDeleteConfirmationModalOpened(true)
    }

    const handleCloseDeleteConfirmationModal = () => {
        setDeleteConfirmationModalOpened(false)
    }

    const handleConfirmDelete = () => {
        remove(selected).then(() => {
            getData()
            setSelected([])
            handleCloseDeleteConfirmationModal()

            const moreThanOne = selected.length > 1 ? 's' : ''
            const confirmationMessage = `Favorecido${moreThanOne} removido${moreThanOne} com sucesso`
            enqueueSnackbar(confirmationMessage, { variant: 'success', anchorOrigin: { vertical: 'top', horizontal: 'right' }, autoHideDuration: 6000 })
        })
    }

    const isSelected = (_id) => selected.indexOf(_id) !== -1;

    const getStatusButton = (status) => {
        return (
            <div className={`grantee-status-button ${status === '1' ? 'validated' : 'draft'}`}>
                {status === '1' ? 'Validado' : 'Rascunho'}
            </div>
        )
    }

    const onItemUpdated = (data) => {
        const newRows = [...rows]
        const updatedIndex = newRows.findIndex(item => item._id === data._id)
        if (updatedIndex >= 0) {
            newRows[updatedIndex] = data
        }
        setRows(newRows)
        handleCloseGranteeModal()
    }

    const onItemDeleted = (ids) => {
        getData()
        setSelected([])
        handleCloseGranteeModal()
        enqueueSnackbar('Favorecido removido com sucesso', { variant: 'success', anchorOrigin: { vertical: 'top', horizontal: 'right' }, autoHideDuration: 6000 })
    }

    return (
        <div className={classes.root}>
            <GranteeEdit id={selectedId} opened={editGranteeModalOpened} handleClose={handleCloseGranteeModal} onItemUpdated={onItemUpdated} onItemDeleted={onItemDeleted} />
            <DeleteConfirmationModal title="Excluir Favorecido" subtitle={`Você Confirma a exclusão do favorecido?`} description="O hitórico de pagamentos para este favorecido será mantido, mas ele será removido da sua lista de favorecidos." opened={deleteConfirmationModalOpened} handleClose={handleCloseDeleteConfirmationModal} handleConfirm={handleConfirmDelete} />
            <Paper className={classes.paper}>
                <GranteeListToolbar numSelected={selected.length} handleDelete={handleOpenDeleteConfirmationModal} />
                <TableContainer>
                    <Table
                        className={classes.table}
                        aria-labelledby="tableTitle"
                        size={'medium'}
                        aria-label="enhanced table"
                    >
                        <GranteeListHead
                            classes={classes}
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                        />
                        <TableBody>
                            {stableSort(rows, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    const isItemSelected = isSelected(row._id);
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row._id}
                                            selected={isItemSelected}
                                        >
                                            <TableCell padding="checkbox" style={{ paddingLeft: '15px' }}>
                                                <Checkbox
                                                    checked={isItemSelected}
                                                    inputProps={{ 'aria-labelledby': labelId }}
                                                    onChange={(event) => handleSelect(event, row._id)}
                                                />
                                            </TableCell>
                                            <TableCell component="th" id={labelId} scope="row" padding="none" onClick={() => { handleEditGrantee(row) }} >
                                                {row.name}
                                            </TableCell>
                                            <TableCell onClick={() => { handleEditGrantee(row) }}>{row.cpfCnpj}</TableCell>
                                            <TableCell onClick={() => { handleEditGrantee(row) }}>
                                                <BankIcon bank={row.bank} />
                                            </TableCell>
                                            <TableCell onClick={() => { handleEditGrantee(row) }}>{row.agency}{row.agencyDigit ? `-${row.agencyDigit}` : ''}</TableCell>
                                            <TableCell onClick={() => { handleEditGrantee(row) }}>{row.account}{row.accountDigit ? `-${row.accountDigit}` : ''}</TableCell>
                                            <TableCell onClick={() => { handleEditGrantee(row) }}>
                                                {getStatusButton(row.status)}
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <div className="table-paginator">
                    <TablePagination
                        rowsPerPageOptions={[]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                    />
                </div>
                <div className="table-footer">
                    <img src={transfeeraIcon} width="120" alt="" />
                </div>
            </Paper>
        </div>
    );
}

export default GranteeList