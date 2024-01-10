export const ErrorAlert = ({ error }: { error: string }) => {
    return (
        error
            ? <div className="alert alert-danger alert-solid" role="alert" >
                <strong>Something went wrong!</strong> - {error}
            </div>
            : null
    )
}