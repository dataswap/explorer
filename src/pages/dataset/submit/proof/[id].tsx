import React, { useEffect, useState } from "react"
import { InboxOutlined } from "@ant-design/icons"
import type { UploadProps } from "antd"
import { message, Upload } from "antd"
import { useRouter } from "next/router"
import axios from "axios"
import DatasetProofTabel, {
    IDatasetProofTabel,
} from "@/components/dataset/proof/tabel"

const { Dragger } = Upload

function getProps(id: string, setProofList: any): UploadProps {
    return {
        name: "file",
        action: "http://localhost:8888",
        id: id,
        onChange(info) {
            const { status } = info.file
            if (status !== "uploading") {
                console.log(info.file, info.fileList)
            }
            if (status === "done") {
                //read new proof file
                axios("http://localhost:3000/proof.json").then((res) => {
                    const newProofs = res.data.proofs
                    //read old proof params
                    axios(`http://localhost:3001/datasetInfo/${id}`).then(
                        (res) => {
                            const oldProofs = res.data.proofs
                            const updateProofs = { ...oldProofs, ...newProofs }
                            //patch new proof params to the proofs
                            axios.patch(
                                `http://localhost:3001/datasetInfo/${id}`,
                                {
                                    proofs: updateProofs,
                                }
                            )
                            setProofList(
                                Object.keys(updateProofs).map((key) => ({
                                    key: key,
                                    hash: key,
                                    ...updateProofs[key],
                                }))
                            )
                            message.success(
                                `${info.file.name} file uploaded successfully.`
                            )
                        }
                    )
                })
            } else if (status === "error") {
                message.error(`${info.file.name} file upload failed.`)
            }
        },
        onDrop(e) {
            console.log("Dropped files", e.dataTransfer.files)
        },
    }
}

export default () => {
    const [proofList, setProofList] = useState<IDatasetProofTabel[]>()
    const router = useRouter()
    const { id } = router.query

    useEffect(() => {
        id &&
            axios(`http://localhost:3001/datasetInfo/${id}`).then((res) => {
                const oldProofs = res.data.proofs
                oldProofs &&
                    setProofList(
                        Object.keys(oldProofs).map((key) => ({
                            key: key,
                            hash: key,
                            ...oldProofs[key],
                        }))
                    )
            })
    }, [proofList])

    if (typeof id === "string" && id.trim() !== "") {
        return (
            <>
                <Dragger {...getProps(id, setProofList)}>
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">
                        Click or drag file to this area to upload
                    </p>
                </Dragger>
                {proofList && <DatasetProofTabel data={proofList} />}
            </>
        )
    } else {
        return <p>Invalid ID</p>
    }
}
