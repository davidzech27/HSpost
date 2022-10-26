import gqlClient from "./gqlClient"
import { getSdk } from "hooks/generated"

const api = getSdk(gqlClient)

export default api
