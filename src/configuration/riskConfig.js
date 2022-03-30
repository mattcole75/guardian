const config = ({
    likelihoodImpact: {
        likelihood: {
            label: 'Likelihood',
            min: 1,
            max: 6,
            step: 1,
            value: 1,
            1: {
                title: 'Negligible',
                description: 'Negligible likelihood of occurrence (0-5%)',
                doc: '',
                score: 1
            },
            2: {
                title: 'Possible',
                description: 'Possible but not likely (6-20%)',
                doc: '',
                score: 2
            },
            3: {
                title: 'Moderately likely',
                description: 'Moderately likely (21-50%)',
                doc: '',
                score: 3
            },
            4: {
                title: 'Significant chance',
                description: 'Significant chance (50-80%)',
                doc: '',
                score: 4
            },
            5: {
                title: 'Very likely',
                description: 'Very likely (81-95%)',
                doc: '',
                score: 5
            },
            6: {
                title: 'Almost certain',
                description: 'Almost certain (96-100%)',
                doc: '',
                score: 6
            }
        },
        appetite: {
            label: 'Risk Appetite',
            min: 1,
            max: 8,
            step: 1,
            value: 1,
            1: {
                title: 'Zero appetite',
                description: 'There is no tolerance for this risk',
                doc: '',
                score:36
            },
            2: {
                title: 'Minimal appetite',
                description: 'There minimal tolerance for this risk',
                doc: '',
                score: 30
            },
            3: {
                title: 'Very low appetite ',
                description: 'There is very little tolerance for this risk',
                doc: '',
                score: 24
            },
            4: {
                title: 'Low appetite ',
                description: 'There is a low tolereance for this risk',
                doc: '',
                score: 18
            },
            5: {
                title: 'Moderate appetite',
                description: 'There is some tolerance for this risk',
                doc: '',
                score: 12
            },
            6: {
                title: 'Medium to high appetite',
                description: 'There is tolereance for this risk',
                doc: '',
                score: 6
            },
            7: {
                title: 'High to very high appetite',
                description: 'There is a high tolerance for this risk',
                doc: '',
                score: 3
            },
            8: {
                title: 'Unlimited appetite',
                description: 'There is unlimited tolerance for this risk',
                doc: '',
                score: 0
            }
        },
        healthSafety: {
            label: 'Health & Safety',
            min: 1,
            max: 6,
            step: 1,
            value: 1,
            1: {
                title: 'Insignificant',
                description: 'Incident will not result in injury',
                doc: '',
                score: 1
            },
            2: {
                title: 'Minor',
                description: 'Minor injury or illness, first aid treatment needed',
                doc: '',
                score: 2
            },
            3: {
                title: 'Moderate',
                description: 'Major injury requiring medical attention and/or causing > 3 days absence (i.e. RIDDOR reportable)',
                doc: '',
                score: 3
            },
            4: {
                title: 'Significant',
                description: 'Single major injury, or long term incapacity / disability (loss of limb)',
                doc: '',
                score: 4
            },
            5: {
                title: 'Major',
                description: 'A number of major injuries, or long term incapacity / disability (loss of limb)',
                doc: '',
                score: 5
            },
            6: {
                title: 'Catastrophic',
                description: 'Death or major permanent incapacity',
                doc: '',
                score: 6
            }
        },
        compliance: {
            label: 'Compliance',
            min: 1,
            max: 6,
            step: 1,
            value: 1,
            1: {
                title: 'Insignificant',
                description: 'Advice from regulators, low priority recommendations',
                doc: 'External / Internal Audit low priority recommendations',
                score: 1
            },
            2: {
                title: 'Minor',
                description: 'Advice from regulators, medium priority recommendations',
                doc: 'External / Internal Audit medium priority recommendations',
                score: 2
            },
            3: {
                title: 'Moderate',
                description: 'Criticism from regulators, high priority recommendations',
                doc: 'External / Internal Audit high priority recommendations and limited assurance',
                score: 3
            },
            4: {
                title: 'Significant',
                description: 'Formal action by regulators',
                doc: '',
                score: 4
            },
            5: {
                title: 'Major',
                description: 'Prosecution / sanctions',
                doc: '',
                score: 5
            },
            6: {
                title: 'Catastrophic',
                description: 'Corporate manslaughter or similar',
                doc: '',
                score: 6
            }
        },
        financial: {
            label: 'Financial',
            min: 1,
            max: 6,
            step: 1,
            value: 1,
            1: {
                title: 'Insignificant',
                description: 'Small loss less than £1,000',
                doc: '',
                score: 1
            },
            2: {
                title: 'Minor',
                description: 'Loss between £1,000 and £10,000',
                doc: '',
                score: 2
            },
            3: {
                title: 'Moderate',
                description: 'Loss between £10,000 and £100,000',
                doc: '',
                score: 3
            },
            4: {
                title: 'Significant',
                description: 'Loss between £100,000 and £1m',
                doc: '',
                score: 4
            },
            5: {
                title: 'Major',
                description: 'Loss between £1m and £5m',
                doc: '',
                score: 5
            },
            6: {
                title: 'Catastrophic',
                description: 'Loss greater than £5m',
                doc: '',
                score: 6
            }
        },
        publicity: {
            label: 'Publicity',
            min: 1,
            max: 6,
            step: 1,
            value: 1,
            1: {
                title: 'Insignificant',
                description: 'No negative media attention',
                doc: '',
                score: 1
            },
            2: {
                title: 'Minor',
                description: 'Local Media – short term ',
                doc: '',
                score: 2
            },
            3: {
                title: 'Moderate',
                description: 'Local Media – long term',
                doc: 'Sporadic / non-mainstream international media',
                score: 3
            },
            4: {
                title: 'Significant',
                description: 'Local Media – long term; sporadic regional/national media',
                doc: 'Persistent non-mainstream international media',
                score: 4
            },
            5: {
                title: 'Major',
                description: 'National Media < 3 days',
                doc: 'Negative article in mainstream international media',
                score: 5
            },
            6: {
                title: 'Catastrophic',
                description: 'National Media > 3 days MP concern',
                doc: 'Front page, headline extremely negative series of articles in mainstream international media',
                score: 6
            }
        },
        reputation: {
            label: 'Reputation',
            min: 1,
            max: 6,
            step: 1,
            value: 1,
            1: {
                title: 'Insignificant',
                description: 'One or two complaint from stakeholders / customers',
                doc: '',
                score: 1
            },
            2: {
                title: 'Minor',
                description: 'Regular multiple complaints from stakeholders / customers',
                doc: '',
                score: 2
            },
            3: {
                title: 'Moderate',
                description: 'Multiple serious complaints from stakeholders / customers',
                doc: '',
                score: 3
            },
            4: {
                title: 'Significant',
                description: 'Multiple serious complaints unable to be resolved',
                doc: 'concerns are raised regarding specific projects',
                score: 4
            },
            5: {
                title: 'Major',
                description: 'Extent of complaints is so extensive that customers and stakeholders begin disengaging',
                doc: '',
                score: 5
            },
            6: {
                title: 'Catastrophic',
                description: 'Level of complaints and inability to address leads to high risk of organisational failure',
                doc: '',
                score: 6
            }
        },
        service: {
            label: 'Service',
            min: 1,
            max: 6,
            step: 1,
            value: 1,
            1: {
                title: 'Insignificant',
                description: 'Minimal interruption, quickly remedied',
                doc: '',
                score: 1
            },
            2: {
                title: 'Minor',
                description: 'Minor interruption remedied within 24 to 48 hrs',
                doc: '',
                score: 2
            },
            3: {
                title: 'Moderate',
                description: 'Interruption over 2 days but less than 7 days to recover',
                doc: 'Significant waste of time and resources, impact on service delivery',
                score: 3
            },
            4: {
                title: 'Significant',
                description: 'Interruption between 7 and 27 days and expensive to recover.',
                doc: 'Serious impact on output and reputation',
                score: 4
            },
            5: {
                title: 'Major',
                description: 'Interruption over 28 days and expensive to recover',
                doc: 'Serious impact on output and reputation',
                score: 5
            },
            6: {
                title: 'Catastrophic',
                description: 'Ongoing to Medium term interruption',
                doc: 'Critical impact, huge cost, difficult to recover',
                score: 6
            }
        },
        humanResource: {
            label: 'Human Resource',
            min: 1,
            max: 6,
            step: 1,
            value: 1,
            1: {
                title: 'Insignificant',
                description: 'Short term staffing issues temporarily reduces service quality (< 1 day)',
                doc: '',
                score: 1
            },
            2: {
                title: 'Minor',
                description: 'Ongoing staffing issues reduces service quality (< 7 days)',
                doc: 'Reduction of positive results in staff survey',
                score: 2
            },
            3: {
                title: 'Moderate',
                description: 'Staff issues lead to late delivery of a key objective / service',
                doc: 'Notable reduction in positive results of the staff survey',
                score: 3
            },
            4: {
                title: 'Significant',
                description: 'Loss of staff in key positions',
                doc: 'Difficulty in appointing suitable staff from within or attracting new staff',
                score: 4
            },
            5: {
                title: 'Major',
                description: 'Loss of staff in key positions threatens achievement of service / objectives',
                doc: 'Unable to attract quality staff in key positions. Industrial action and staff unrest',
                score: 5
            },
            6: {
                title: 'Catastrophic',
                description: 'Loss of staff in keypositions leading to inability to meet key corporate objectives',
                doc: 'significant reputation damage / mass staff leaving',
                score: 6
            }
        },
        objective: {
            label: 'Objectives',
            min: 1,
            max: 6,
            step: 1,
            value: 1,
            1: {
                title: 'Insignificant',
                description: 'Individual objectives not met',
                doc: '',
                score: 1
            },
            2: {
                title: 'Minor',
                description: 'Team objectives not met',
                doc: '',
                score: 2
            },
            3: {
                title: 'Moderate',
                description: 'Service objectives not met',
                doc: '',
                score: 3
            },
            4: {
                title: 'Significant',
                description: 'Multiple service objectives not met',
                doc: '',
                score: 4
            },
            5: {
                title: 'Major',
                description: 'Corporate objectives not met',
                doc: '',
                score: 5
            },
            6: {
                title: 'Catastrophic',
                description: 'Corporate objectives not met and strategic aims unable to be implemented',
                doc: '',
                score: 6
            }
        },
        project: {
            label: 'Project',
            min: 1,
            max: 6,
            step: 1,
            value: 1,
            1: {
                title: 'Insignificant',
                description: 'A change in the authorised project budget, increase in delivery time or change in project specification',
                doc: '',
                score: 1
            },
            2: {
                title: 'Minor',
                description: 'More than 5% over budget or any overspend in excess of £50k',
                doc: 'Changes to the project specification leads to operational difficulties in the service',
                score: 2
            },
            3: {
                title: 'Moderate',
                description: 'More than 10% over budget or any overspend in excess of £1m / schedule slippage leads to additional operational costs',
                doc: 'Significant change to project requiring re-authorisation',
                score: 3
            },
            4: {
                title: 'Significant',
                description: 'More than 30% over budget or any overspend in excess of £2m / schedule slippage leads to additional operational costs in excess of £500k',
                doc: 'Project output fails to meet secondary objectives and causes delay in achieving the primary objectives or causes any delay in achieving key corporate objectives',
                score: 4
            },
            5: {
                title: 'Major',
                description: 'More than 50% over budget or any overspend in excess of £5m / schedule slippage leads to additional operational costs in excess of £1m',
                doc: '',
                score: 5
            },
            6: {
                title: 'Catastrophic',
                description: 'Overspend in excess of £10m or project overspend, delay or poor design leads to the inability to achieve key corporate objectives',
                doc: '',
                score: 6
            }
        },
        supplyChain: {
            label: 'Supply Chain',
            min: 1,
            max: 6,
            step: 1,
            value: 1,
            1: {
                title: 'Insignificant',
                description: 'A change in the authorised project budget, increase in delivery time or change in project specification',
                doc: '',
                score: 1
            },
            2: {
                title: 'Minor',
                description: 'More than 5% over budget or any overspend in excess of £50k',
                doc: 'Changes to the project specification leads to operational difficulties in the service',
                score: 2
            },
            3: {
                title: 'Moderate',
                description: 'More than 10% over budget or any overspend in excess of £1m / schedule slippage leads to additional operational costs',
                doc: 'Significant change to project requiring re-authorisation',
                score: 3
            },
            4: {
                title: 'Significant',
                description: 'More than 30% over budget or any overspend in excess of £2m / schedule slippage leads to additional operational costs in excess of £500k',
                doc: 'Project output fails to meet secondary objectives and causes delay in achieving the primary objectives or causes any delay in achieving key corporate objectives',
                score: 4
            },
            5: {
                title: 'Major',
                description: 'More than 50% over budget or any overspend in excess of £5m / schedule slippage leads to additional operational costs in excess of £1m',
                doc: '',
                score: 5
            },
            6: {
                title: 'Catastrophic',
                description: 'Overspend in excess of £10m or project overspend, delay or poor design leads to the inability to achieve key corporate objectives',
                doc: '',
                score: 6
            }
        }
    }
});

module.exports = config;