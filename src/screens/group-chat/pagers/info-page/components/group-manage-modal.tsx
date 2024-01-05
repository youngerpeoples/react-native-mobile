import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import Navbar from '@/components/navbar';
import {styled} from 'nativewind';
import {forwardRef, useImperativeHandle, useState} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {Modal} from 'react-native-ui-lib';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const StyledView = styled(View);
const StyledText = styled(Text);

const rules = [
  '1. 修改群聊名称',
  '2. 发表群公告',
  '3. 设置退群方式，并可确认退群申请',
  '4. 移除成员',
];

const RulesList: React.FC = () => (
  <StyledView className="bg-gray-200 p-3 rounded-lg ">
    {rules.map((rule, index) => (
      <StyledView key={index} className="flex items-start">
        <StyledText className="px-4 py-2">{rule}</StyledText>
      </StyledView>
    ))}
  </StyledView>
);

export interface GroupManageModalRef {
  open: () => void;
}
const groupmange = forwardRef(
  (
    props: {
      onCheck?: () => void;
      // onReject: () => void;
    },
    ref,
  ) => {
    const [visible, setVisible] = useState(false);
    const insets = useSafeAreaInsets();
    useImperativeHandle(ref, () => ({
      open: () => {
        setVisible(true);
      },
    }));
    return (
      <Modal
        animationType="slide"
        visible={visible}
        style={{
          flex: 1,
        }}>
        <StyledView
          style={{
            flex: 1,
            backgroundColor: 'white',
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
          }}>
          <Navbar
            backgroundColor="white"
            title="群管理"
            onLeftPress={() => setVisible(false)}
          />
          <StyledView className="bg-white mt-3 pl-10 flex-row">
            <StyledText className="text-lg font-bold text-gray-700">
              群管理员可以用以下权利:
            </StyledText>
          </StyledView>
          <StyledView className="m-3 rounded-sm">
            <RulesList />
          </StyledView>
          <StyledView className="mt-3 flex-row space-x-1">
            <TouchableOpacity style={{flex: 1, alignItems: 'center'}}>
              <Icon name="add-circle-outline" size={48} color="black" />
              <StyledText className="text-sm text-black mt-2 text-center">
                邀请好友
              </StyledText>
            </TouchableOpacity>

            <TouchableOpacity style={{flex: 1, alignItems: 'center'}}>
              <Icon name="remove-circle-outline" size={48} color="black" />
              <StyledText className="text-sm text-black mt-2 text-center">
                踢出成员
              </StyledText>
            </TouchableOpacity>
          </StyledView>
        </StyledView>
      </Modal>
    );
  },
);
export default groupmange;
