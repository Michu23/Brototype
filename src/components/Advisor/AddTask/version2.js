export const AddTask2 = ({ content }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleSubmit = () => {
    setOpen(false);
  };
  return (
    <form >
      <Button variant="outlined" className="addtask" onClick={handleClickOpen}>
        click
      </Button>
      <Dialog
        open={open}
        onClose={handleSubmit}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">click</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Box
              component="form"
              noValidate
              autoComplete="off"
              className="d-block p-3 px-5"
              style={{ width: "500px", height: "fit-content" }}
            >
              <Row>
                {content.props.map((prop) => {
                  if (prop.element === "select") {
                    return (
                      <Col xs={12}>
                        <FormControl className="mb-4 w-100">
                          <InputLabel id="location-label">{prop.label}</InputLabel>
                          <Select
                            labelId="location-label"
                            id="location-selected"
                            autoWidth
                            label={prop.label}
                            maxHeight="200px"
                          >
                            {prop.options.map((option) => {
                              return (
                                <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                              )
                            })}
                          </Select>
                        </FormControl>
                      </Col>
                    )
                  } else if (prop.element === "input") {
                    return (
                      <Col xs={12}>
                        <TextField
                          id="outlined-basic"
                          label={prop.label}
                          variant="outlined"
                          placeholder={prop.placeholder}
                          className="my-2 w-100"
                        />
                      </Col>
                    )
                  }
                })}
              </Row>
            </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit} autoFocus>
            Agree
          </Button>
          <Button onClick={handleSubmit}>Close</Button>
        </DialogActions>
      </Dialog>
    </form>
  )
}