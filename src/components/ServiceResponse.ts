import { CommandServiceResponses } from '../command-client/types/response'
import { LocationResponse } from './location-client/types/response'
import { GatewayCommand, CommandMessage } from '../command-client/types/Command'

export type ServiceResponses = CommandServiceResponses | LocationResponse

export type HttpRequests = CommandMessage | GatewayCommand
