import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet } from 'react-native';
import { RadioButton, Checkbox } from 'react-native-paper';

export default function RelatorioVisita() {
  const [motivos, setMotivos] = useState({
    tecnica: false,
    curso: false,
    levantamento: false,
    inspecao: false,
    exame: false,
  });

  const checklistItems = [
    { label: 'Sinalização de Segurança', field: 'sinalizacao' },
    { label: 'EPIs disponíveis e uso correto', field: 'epis' },
    { label: 'Treinamentos atualizados', field: 'treinamentos' },
    { label: 'Condições das máquinas', field: 'maquinas' },
    { label: 'Cadeiras e postura', field: 'cadeiras' },
    { label: '5S - Organização', field: 'cincoS' },
    { label: 'Instalações elétricas', field: 'eletrica' },
    { label: 'Proteção contra incêndio', field: 'incendio' },
    { label: 'Produtos químicos', field: 'quimicos' },
    { label: 'Ergonomia', field: 'ergonomia' },
    { label: 'Gestão de resíduos', field: 'residuos' },
    { label: 'Equipamentos de emergência', field: 'emergencia' },
  ];

  const [checklist, setChecklist] = useState(
    checklistItems.reduce((acc, item) => {
      acc[item.field] = { status: '', observacao: '' };
      return acc;
    }, {})
  );

  const toggleCheckbox = (field:any) => {
    setMotivos({ ...motivos, [field]: !motivos[field] });
  };

  const handleRadioChange = (field:any, value:any) => {
    setChecklist((prev) => ({
      ...prev,
      [field]: {
        ...prev[field],
        status: value,
        observacao: value === 'nao-conforme' ? prev[field].observacao : '', // limpa obs se não for "nao-conforme"
      },
    }));
  };

  const handleObsChange = (field : any, text : any) => {
    setChecklist((prev) => ({
      ...prev,
      [field]: {
        ...prev[field],
        observacao: text,
      },
    }));
  };

  return (
    <ScrollView style={styles.container}>
      {/* Dados da empresa */}
      <View style={styles.form}>
        <Text style={styles.reportTitle}>Relatório de Visita</Text>

        <View style={styles.row}>
          <View style={styles.inputBox}>
            <Text>Empresa:</Text>
            <TextInput style={styles.input} />
          </View>
          <View style={styles.inputBox}>
            <Text>Endereço:</Text>
            <TextInput style={styles.input} />
          </View>
        </View>

        <Text style={styles.sectionTitle}>Motivo:</Text>
        <View style={styles.checkboxContainer}>
          <Checkbox.Item
            label="Visita Técnica"
            status={motivos.tecnica ? 'checked' : 'unchecked'}
            onPress={() => toggleCheckbox('tecnica')}
          />
          <Checkbox.Item
            label="Curso/Treinamento"
            status={motivos.curso ? 'checked' : 'unchecked'}
            onPress={() => toggleCheckbox('curso')}
          />
          <Checkbox.Item
            label="Levantamento de Dados"
            status={motivos.levantamento ? 'checked' : 'unchecked'}
            onPress={() => toggleCheckbox('levantamento')}
          />
          <Checkbox.Item
            label="Inspeção"
            status={motivos.inspecao ? 'checked' : 'unchecked'}
            onPress={() => toggleCheckbox('inspecao')}
          />
          <Checkbox.Item
            label="Exame Médico"
            status={motivos.exame ? 'checked' : 'unchecked'}
            onPress={() => toggleCheckbox('exame')}
          />
        </View>

        <View style={styles.inputBox}>
          <Text>Data:</Text>
          <TextInput style={styles.input} placeholder="DD/MM/AAAA" />
        </View>
      </View>

      {/* Checklist com observações */}
      <View style={styles.form}>
        <Text style={styles.reportTitle}>Checklist de Visita</Text>

        <View style={styles.row}>
          <View style={styles.inputBox}>
            <Text>Responsável por acompanhar:</Text>
            <TextInput style={styles.input} />
          </View>
          <View style={styles.inputBox}>
            <Text>Técnico Responsável:</Text>
            <TextInput style={styles.input} />
          </View>
        </View>

        {checklistItems.map((item) => (
          <View key={item.field} style={styles.radioGroup}>
            <Text style={styles.radioLabel}>{item.label}:</Text>
            <RadioButton.Group
              onValueChange={(value) => handleRadioChange(item.field, value)}
              value={checklist[item.field].status}
            >
              <View style={styles.radioRow}>
                <RadioButton value="conforme" />
                <Text>Conforme</Text>
                <RadioButton value="nao-conforme" />
                <Text>Não Conforme</Text>
                <RadioButton value="nao-aplicado" />
                <Text>Não Aplicado</Text>
              </View>
            </RadioButton.Group>

            {/* Observação aparece se "Não Conforme" */}
            {checklist[item.field].status === 'nao-conforme' && (
              <View style={styles.obsContainer}>
                <Text style={styles.obsLabel}>Observação:</Text>
                <TextInput
                  style={styles.obsInput}
                  multiline
                  numberOfLines={2}
                  value={checklist[item.field].observacao}
                  onChangeText={(text) => handleObsChange(item.field, text)}
                  placeholder="Descreva o problema encontrado"
                />
              </View>
            )}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 10,
  },
  form: {
    borderWidth: 1,
    borderColor: '#000',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  reportTitle: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    gap: 10,
  },
  inputBox: {
    flex: 1,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#000',
    padding: 5,
    borderRadius: 4,
    marginTop: 2,
  },
  checkboxContainer: {
    marginBottom: 10,
  },
  sectionTitle: {
    fontWeight: '600',
    marginBottom: 5,
  },
  radioGroup: {
    marginBottom: 15,
  },
  radioLabel: {
    fontWeight: '600',
    marginBottom: 5,
  },
  radioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flexWrap: 'wrap',
  },
  obsContainer: {
    marginTop: 5,
  },
  obsLabel: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 2,
  },
  obsInput: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 4,
    padding: 5,
    textAlignVertical: 'top',
  },
});
