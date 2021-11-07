export interface DicomUIDs {
    studyUID : string,
    seriesUID: string,
    instanceUID : string
}

export default class DicomUidReplacer {
    private studyUIDs  = new Map<string,string>()
    private seriesUIDs = new Map<string, string>()


    replace({studyUID, seriesUID, instanceUID }: DicomUIDs) : DicomUIDs {
        return {
            studyUID : this.getStudyUID(studyUID),
            seriesUID: this.getSeriesUID(seriesUID),
            instanceUID: this.newUID(instanceUID)
        }
    }

    private getStudyUID( uid : string ) : string {
        if( !this.studyUIDs.has(uid)) {
            this.studyUIDs.set(uid, this.newUID(uid))
        }
        return this.studyUIDs.get(uid)!
    }

    private getSeriesUID( uid : string ) : string {
        if( !this.seriesUIDs.has(uid)) {
            this.seriesUIDs.set(uid, this.newUID(uid))
        }
        return this.seriesUIDs.get(uid)!
    }

    private newUID  (uid:string) {
        const time = (new Date()).getTime()
        const rnd = Math.round(Math.random() * 1_000_000)
        const tail= `${time}.${rnd}`
        const head= uid.substr(0, 64-tail.length)
        return head+tail
    }

}