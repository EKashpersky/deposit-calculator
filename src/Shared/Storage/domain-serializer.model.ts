export interface DomainSerializer<DomainModel, DomainPojo> {
  deserialize(name: string, model: DomainPojo): DomainModel;
  serialize(model: DomainModel): DomainPojo;
}