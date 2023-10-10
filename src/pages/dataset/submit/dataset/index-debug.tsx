import { Button, Form, InputNumber, Input, Select, Space, Switch } from "antd"
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons"
import axios from "axios"
import { date } from "zod"
import { useRouter } from "next/router"
import TestForm from "@/components/form/dataset"

export default () => {
    const router = useRouter()
    const onFinish = (values: any) => {
        axios
            .post("http://localhost:3001/datasetInfo", {
                ...values,
                createdTime: "11111",
                replicasState: "",
                replicasOperate: "",
                createdHeight: "9999",
                submitter: "0x00000000000000000000",
                state: "MetadataSubmitted",
                operate: "proof",
                replicasDetail: values.replicasCountries.reduce(
                    (result: any, country: any, index: number) => {
                        const datasetReplica = {
                            id: `${index + 1}`,
                            country,
                            dp: "MockDP",
                            state: "",
                            operate: "",
                        }
                        result[datasetReplica.id] = datasetReplica
                        return result
                    },
                    {}
                ),
            })
            .then((res) => {
                router.push(
                    `http://localhost:3000/dataset/detail/${res.data.id}`
                )
            })
    }

    return <TestForm></TestForm>
}
