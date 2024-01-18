/*******************************************************************************
 *   (c) 2024 dataswap
 *
 *  Licensed under either the MIT License (the "MIT License") or the Apache License, Version 2.0
 *  (the "Apache License"). You may not use this file except in compliance with one of these
 *  licenses. You may obtain a copy of the MIT License at
 *
 *      https://opensource.org/licenses/MIT
 *
 *  Or the Apache License, Version 2.0 at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the MIT License or the Apache License for the specific language governing permissions and
 *  limitations under the respective licenses.
 ********************************************************************************/

export const config_message = "message"
export const config_dataset = "dataset"
export const config_matching = "matching"
export const config_home = "home"
export const config_storage = "storage"
export const config_members = "members"
export const config_about = "about"
export const config_car = "car"
export const config_carreplica = "carreplica"
export const config_requirement = "requirement"
export const config_proofmetadata = "proofmetadata"
export const config_challenge = "challenge"

const config_detail = "detail"
export const config_messageDetailPageRoot = `/${config_message}/${config_detail}`
export const config_datasetDetailPageRoot = `/${config_dataset}/${config_detail}`
export const config_matchingDetailPageRoot = `/${config_matching}/${config_detail}`
export const config_carDetailPageRoot = `/${config_dataset}/${config_car}/${config_detail}`
export const config_carReplicaDetailPageRoot = `/${config_matching}/${config_carreplica}/${config_detail}`
export const config_requirementDetailPageRoot = `/${config_dataset}/${config_detail}/${config_requirement}`
export const config_proofmetadataDetailPageRoot = `/${config_dataset}/${config_detail}/${config_proofmetadata}`
export const config_challengeDetailPageRoot = `/${config_dataset}/${config_detail}/${config_challenge}`
