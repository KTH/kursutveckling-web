import React from 'react'
import { RoundAnalysisAdminWeb, RoundAnalysisCanvas } from './types'
import AnalysisListItem from './AnalysisListItem'

const AnalysisList: React.FC<{ analyses: RoundAnalysisCanvas[] | RoundAnalysisAdminWeb[] }> = ({ analyses }) => {
  return analyses?.map((analysis) => {
    const { _id } = analysis
    return <AnalysisListItem key={_id} analysis={analysis} />
  })
}

export default AnalysisList
